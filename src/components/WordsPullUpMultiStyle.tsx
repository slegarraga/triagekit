import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Segment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  containerClassName?: string
  delay?: number
}

export function WordsPullUpMultiStyle({
  segments,
  containerClassName = '',
  delay = 0,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Flatten all words with their associated className
  const allWords: { word: string; className: string }[] = []
  for (const seg of segments) {
    const words = seg.text.split(' ').filter(Boolean)
    for (const word of words) {
      allWords.push({ word, className: seg.className ?? '' })
    }
  }

  return (
    <span
      ref={ref}
      className={`inline-flex flex-wrap justify-center gap-x-[0.28em] ${containerClassName}`}
    >
      {allWords.map((item, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            className={item.className}
            style={{ display: 'inline-block' }}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
