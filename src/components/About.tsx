import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'
import { AnimatedLetter } from './AnimatedLetter'

const BODY_TEXT =
  'Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.'

export function About() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = BODY_TEXT.split('')

  return (
    <section ref={sectionRef} className="bg-black py-16 sm:py-20 md:py-28 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#101010] rounded-2xl md:rounded-3xl px-6 sm:px-10 md:px-16 py-12 sm:py-16 md:py-20 text-center">
          {/* Label */}
          <span className="text-primary text-[10px] sm:text-xs font-medium tracking-widest uppercase block mb-6 sm:mb-8">
            Visual arts
          </span>

          {/* Multi-style heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-8 sm:mb-12">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'I am Marcus Chen,', className: 'font-normal text-primary' },
                {
                  text: 'a self-taught director.',
                  className: 'italic font-serif text-primary',
                },
                {
                  text: 'I have skills in color grading, visual effects, and narrative design.',
                  className: 'font-normal text-primary',
                },
              ]}
              containerClassName="leading-[0.95] sm:leading-[0.9]"
            />
          </h2>

          {/* Scroll-animated body paragraph */}
          <p
            className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#DEDBC8' }}
          >
            {chars.map((char, i) => (
              <AnimatedLetter
                key={i}
                char={char}
                scrollProgress={scrollYProgress}
                index={i}
                total={chars.length}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
