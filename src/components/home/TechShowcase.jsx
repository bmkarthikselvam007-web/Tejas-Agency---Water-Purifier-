import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import ScrollVideoSection from "./ScrollVideoSection";
import "./ScrollVideoSection.css";

/**
 * Tejas Agency's scroll-driven purification showcase.
 *
 * Keeps the brand copy and frame-sequence configuration in one place so
 * ScrollVideoSection itself stays generic and reusable.
 */

const FRAME_PATH = "/media/purifier-scroll";

/*
 * Frames are cut from the source clip with ffmpeg, resampling the full 0-239
 * range evenly. To regenerate at a different density:
 *   ffmpeg -i source.mp4
 *     -vf "select='<evenly spaced eq(n,N) terms>',scale=1440:-2"
 *     -vsync 0 -c:v libwebp -quality 74 -compression_level 6 w1440/%03d.webp
 * The counts below must match the number of files in each directory.
 */
const SOURCES = {
  desktop: { path: FRAME_PATH, dir: "w1440", count: 130 },
  mobile: { path: FRAME_PATH, dir: "w800", count: 85 },
};

/**
 * Captions are anchored to where each part of the footage begins, so the label
 * always describes what is on screen. The clip burns in its own closing type
 * from roughly 83% onward, so the last entry is deliberately blank and hands
 * the frame back to the footage.
 */
const STAGES = [
  { at: 0, label: "A sealed unit on your counter" },
  { at: 0.2, label: "The casing opens on the filter stack" },
  { at: 0.4, label: "Sediment, carbon and RO membrane stages" },
  { at: 0.6, label: "Every stage carries the water forward" },
  { at: 0.74, label: "Sealed back into one serviceable unit" },
  { at: 0.82, label: "" },
];

export default function TechShowcase() {
  return (
    <>
      <section className="section section--tight">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Inside the technology"
              title="What sits behind the panel of an RO purifier"
              description="Scroll to open the unit up, stage by stage, and see the filters your water passes through before it reaches your glass."
              align="center"
            />
          </Reveal>
        </div>
      </section>

      <ScrollVideoSection
        sources={SOURCES}
        poster={`${FRAME_PATH}/poster.webp`}
        stages={STAGES}
        scrollHeight="320vh"
        mobileScrollHeight="240vh"
        label="An RO water purifier opening to reveal its sediment, carbon and membrane filter stages, then closing again"
      />
    </>
  );
}
