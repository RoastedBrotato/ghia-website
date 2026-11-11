#!/usr/bin/env bash
# Renders the motion assets used on the site into public/motion/.
# Usage: npm run motion:render
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=public/motion
mkdir -p "$OUT"
R="npx remotion"
ENTRY=remotion/index.ts
PUB="--public-dir=remotion/public"

# Showreel: H.264 MP4 only — decodes reliably in every browser.
$R render $ENTRY Reel "$OUT/reel.mp4" $PUB --codec=h264 --crf=18 --x264-preset=slow --pixel-format=yuv420p
# Poster: the "one system" frame, shown before playback and under reduced motion.
$R still $ENTRY Reel "$OUT/reel.jpg" $PUB --frame=300 --image-format=jpeg --jpeg-quality=85

# HeroLoop is kept as a composition for future use but is not rendered for the site.
ls -la "$OUT"
