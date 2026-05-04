import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'

const CARD_EASE = [0.22, 1, 0.36, 1] as const

interface FeatureCardProps {
  children: React.ReactNode
  index: number
  isInView: boolean
}

function FeatureCard({ children, index, isInView }: FeatureCardProps) {
  return (
    <motion.article
      className="relative rounded-2xl overflow-hidden flex-1 min-h-[320px] lg:h-[480px]"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: CARD_EASE,
      }}
    >
      {children}
    </motion.article>
  )
}

interface CheckItemProps {
  text: string
}

function CheckItem({ text }: CheckItemProps) {
  return (
    <li className="flex items-start gap-2">
      <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
      <span className="text-gray-400 text-xs">{text}</span>
    </li>
  )
}

interface TextCardProps {
  number: string
  title: string
  icon: string
  items: string[]
  index: number
  isInView: boolean
}

function TextCard({ number, title, icon, items, index, isInView }: TextCardProps) {
  return (
    <FeatureCard index={index} isInView={isInView}>
      <div className="bg-[#212121] h-full p-5 sm:p-6 flex flex-col justify-between">
        {/* Top */}
        <div>
          <img
            src={icon}
            alt=""
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover mb-4"
          />
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-gray-500 text-[10px] font-mono">{number}</span>
            <h3 className="text-primary text-sm sm:text-base font-medium">{title}</h3>
          </div>
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <CheckItem key={item} text={item} />
            ))}
          </ul>
        </div>

        {/* Bottom */}
        <div className="mt-6">
          <button className="flex items-center gap-1.5 text-primary/60 hover:text-primary text-xs transition-colors duration-200">
            Learn more
            <ArrowRight className="w-3 h-3 -rotate-45" />
          </button>
        </div>
      </div>
    </FeatureCard>
  )
}

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative min-h-screen bg-black py-16 sm:py-20 md:py-28 px-4 md:px-6 overflow-hidden">
      {/* Noise background */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
          <WordsPullUpMultiStyle
            segments={[
              {
                text: 'Studio-grade workflows for visionary creators.',
                className: 'text-primary font-normal',
              },
            ]}
            containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight mb-3 block"
          />
          <WordsPullUpMultiStyle
            segments={[
              {
                text: 'Built for pure vision. Powered by art.',
                className: 'text-gray-500 font-normal',
              },
            ]}
            containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight block"
            delay={0.3}
          />
        </div>

        {/* 4-column card grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1"
        >
          {/* Card 1 — Video */}
          <FeatureCard index={0} isInView={isInView}>
            <div className="relative h-full min-h-[320px] lg:h-[480px]">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-sm sm:text-base font-medium" style={{ color: '#E1E0CC' }}>
                  Your creative canvas.
                </p>
              </div>
            </div>
          </FeatureCard>

          {/* Card 2 — Project Storyboard */}
          <TextCard
            index={1}
            isInView={isInView}
            number="01"
            title="Project Storyboard."
            icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
            items={[
              'Drag-and-drop scene sequencing',
              'Attach reference footage and notes per shot',
              'Collaborate with your team in real time',
              'Export as PDF or share a live link',
            ]}
          />

          {/* Card 3 — Smart Critiques */}
          <TextCard
            index={2}
            isInView={isInView}
            number="02"
            title="Smart Critiques."
            icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
            items={[
              'AI-powered frame-level analysis',
              'Creative notes from fellow artists',
              'Connect your existing post tools',
            ]}
          />

          {/* Card 4 — Immersion Capsule */}
          <TextCard
            index={3}
            isInView={isInView}
            number="03"
            title="Immersion Capsule."
            icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
            items={[
              'Silence all non-essential notifications',
              'Ambient soundscapes to enter flow state',
              'Sync with your existing schedule',
            ]}
          />
        </div>
      </div>
    </section>
  )
}
