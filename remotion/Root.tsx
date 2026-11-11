import { Composition } from "remotion";
import { HeroLoop } from "./HeroLoop";
import { Reel, REEL_DURATION } from "./Reel";
import { loadBrandFonts } from "./theme";

loadBrandFonts();

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="HeroLoop" component={HeroLoop} durationInFrames={240} fps={30} width={1920} height={1080} />
    <Composition id="Reel" component={Reel} durationInFrames={REEL_DURATION} fps={30} width={1920} height={1080} />
  </>
);
