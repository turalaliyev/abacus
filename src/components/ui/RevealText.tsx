import { motion } from "motion/react"
import { EASE, inView } from "../../lib/motion"

type RevealTextProps = {
  text: string
  className?: string
  /** Element to render. Headings should pass their real tag for semantics. */
  as?: "h1" | "h2" | "h3" | "p" | "span"
  delay?: number
  /** Highlight these words in gold (matched case-insensitively). */
  highlight?: string[]
}

/**
 * Reveals a line word by word from behind a mask.
 *
 * Each word sits in an overflow-hidden span so the words slide up out of
 * nothing rather than just fading — the difference between "animated" and
 * "considered". The full string stays in the DOM for screen readers and
 * crawlers; only the visual presentation is split.
 */
export function RevealText({
  text,
  className = "",
  as = "h2",
  delay = 0,
  highlight = [],
}: RevealTextProps) {
  const Tag = motion[as]
  const words = text.split(" ")
  const highlighted = new Set(highlight.map((w) => w.toLowerCase()))

  return (
    <Tag
      // Remounts whenever the text changes (e.g. a language switch swaps
      // settings.hero_title etc.) so the reveal replays cleanly. Without
      // this, `viewport={{ once: true }}` below had already fired for the
      // old words, so the new word spans mounted straight into their
      // "hidden" variant (y: 110%, opacity: 0) with nothing left to push
      // them to "visible" — they'd stay invisible until a full page reload
      // remounted everything.
      key={text}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.045, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom"
          aria-hidden
        >
          <motion.span
            className={`inline-block ${
              highlighted.has(word.toLowerCase().replace(/[.,:;!?]/g, "")) ? "text-gold-400" : ""
            }`}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.75, ease: EASE },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
