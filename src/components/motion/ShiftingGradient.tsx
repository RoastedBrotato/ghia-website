"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/components/ui/primitives";
import { getLenis } from "@/lib/scroll";

/**
 * "Radical shifting" background — a domain-warped noise field cycling through
 * the brand palette (navy → electric blue → cyan → indigo → violet), in WebGL.
 *
 * Built to stay out of the way of scrolling:
 * - renders at ~38% of CSS resolution and is upscaled (the field is soft anyway)
 * - ~14 noise lookups per pixel (was ~25)
 * - capped at 30fps, and 12fps while the page is actively scrolling
 * - no layout reads per frame or per scroll event
 * - stops entirely when off-screen or the tab is hidden; one still frame under
 *   reduced motion
 */
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform float uShift;
uniform vec2 uPointer;

const vec3 navy   = vec3(0.027, 0.082, 0.176);
const vec3 night  = vec3(0.012, 0.043, 0.102);
const vec3 blue   = vec3(0.086, 0.471, 0.910);
const vec3 cyan   = vec3(0.000, 0.784, 1.000);
const vec3 indigo = vec3(0.180, 0.170, 0.640);
const vec3 violet = vec3(0.420, 0.240, 1.000);

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), u.x), mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = rot * p * 2.02; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / uRes.y;
  float t = uTime * 0.06;

  vec2 m = (uPointer - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  p += 0.16 * (m - p) * exp(-2.5 * length(m - p));

  vec2 q = vec2(noise(p * 1.3 + t), noise(p * 1.3 - t + 3.1));
  vec2 r = vec2(fbm(p * 1.6 + 2.0 * q + vec2(1.7, 9.2) + t * 1.2),
                fbm(p * 1.6 + 2.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.15 + (2.2 + uShift * 1.4) * r);

  float x = fract(f * 1.6 + length(r) * 0.35 + t * 0.8 + uShift * 0.6);
  vec3 col = navy;
  col = mix(col, blue,   smoothstep(0.00, 0.22, x));
  col = mix(col, cyan,   smoothstep(0.22, 0.42, x));
  col = mix(col, indigo, smoothstep(0.42, 0.62, x));
  col = mix(col, violet, smoothstep(0.62, 0.80, x) * 0.8);
  col = mix(col, navy,   smoothstep(0.80, 1.00, x));
  col = mix(night, col, 0.25 + 0.75 * smoothstep(0.25, 0.65, f));

  float band = abs(fract(f * 5.0 + t * 2.0) - 0.5);
  col += (1.0 - smoothstep(0.0, 0.03, band)) * 0.08 * cyan;

  col *= 0.8 + 0.3 * (1.0 - smoothstep(0.2, 1.3, length(uv - vec2(0.62, 0.5))));
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;
const RENDER_SCALE = 0.38;

export function ShiftingGradient({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // CSS fallback gradient stays visible

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uShift = gl.getUniformLocation(prog, "uShift");
    const uPointer = gl.getUniformLocation(prog, "uPointer");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Cached geometry — refreshed on resize only, never read per frame.
    let rect = { left: 0, top: 0, width: 1, height: 1 };
    const measure = () => {
      const r = canvas.getBoundingClientRect();
      rect = { left: r.left, top: r.top + window.scrollY, width: r.width, height: r.height };
      canvas.width = Math.max(1, Math.round(r.width * RENDER_SCALE));
      canvas.height = Math.max(1, Math.round(r.height * RENDER_SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(canvas);

    const pointer = { x: 0.6, y: 0.5, tx: 0.6, ty: 0.5 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = 1 - (e.clientY + window.scrollY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let visible = false;
    let last = 0;
    let shift = 0;
    const start = performance.now();

    const draw = (now: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      // Scroll shifts the palette — computed from cached numbers, no layout.
      const target = Math.min(
        1,
        Math.max(0, (window.scrollY - rect.top + window.innerHeight) / (rect.height + window.innerHeight)),
      );
      shift += (target - shift) * 0.1;
      gl.uniform1f(uTime, reduce ? 14 : (now - start) / 1000);
      gl.uniform1f(uShift, shift);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      if (!visible) return;
      raf = requestAnimationFrame(loop);
      const scrolling = Math.abs(getLenis()?.velocity ?? 0) > 0.5;
      const interval = scrolling ? 1000 / 12 : 1000 / 30;
      if (now - last < interval) return;
      last = now;
      draw(now);
    };

    const setVisible = (v: boolean) => {
      visible = v && !document.hidden;
      cancelAnimationFrame(raf);
      if (!visible) return;
      if (reduce) draw(performance.now());
      else raf = requestAnimationFrame(loop);
    };

    let onScreen = false;
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      setVisible(onScreen);
    });
    io.observe(canvas);
    const onVis = () => setVisible(onScreen);
    document.addEventListener("visibilitychange", onVis);

    draw(performance.now());
    canvas.style.opacity = "1";

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      className={cx(
        "bg-[radial-gradient(70%_80%_at_75%_40%,#1678E8_0%,#2A2F9E_38%,#07152D_72%)]",
        className,
      )}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full opacity-0 transition-opacity duration-700" />
    </div>
  );
}
