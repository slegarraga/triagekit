import { motion, useInView } from 'framer-motion'
import { Bug, Lightbulb, LifeBuoy, Download, FileText, Copy, Github } from 'lucide-react'
import { useRef } from 'react'

const CARD_EASE = [0.22, 1, 0.36, 1] as const

interface FeatureProps {
  icon: React.ReactNode
  title: string
  desc: string
  items: string[]
  index: number
  isInView: boolean
}

function FeatureCard({ icon, title, desc, items, index, isInView }: FeatureProps) {
  return (
    <motion.article
      className="bg-[#0a0a0a] rounded-2xl border border-white/5 p-6 flex flex-col"
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: CARD_EASE }}
    >
      <div className="w-10 h-10 rounded-lg bg-[#6366f1]/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-gray-200 text-base font-medium mb-1">{title}</h3>
      <p className="text-gray-500 text-xs mb-4">{desc}</p>
      <ul className="flex flex-col gap-2 mt-auto">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-[#6366f1] mt-2 flex-shrink-0" />
            <span className="text-gray-400 text-xs">{item}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[#6366f1] text-xs font-medium tracking-widest uppercase">Templates</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-100 mt-3 leading-tight">
            Everything a maintainer needs
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
            Three template types, one workflow. Consistent intake for every issue that comes in.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            index={0}
            isInView={isInView}
            icon={<Bug className="w-5 h-5 text-[#f87171]" />}
            title="Bug Reports"
            desc="Standardized format for reproducible bugs"
            items={[
              'Reproduction steps with numbered flow',
              'Expected vs actual behavior',
              'Environment details (OS, browser, version)',
              'Screenshot / log attachment section',
            ]}
          />
          <FeatureCard
            index={1}
            isInView={isInView}
            icon={<Lightbulb className="w-5 h-5 text-[#fbbf24]" />}
            title="Feature Requests"
            desc="Structured proposals for new functionality"
            items={[
              'Problem statement and motivation',
              'Proposed solution with acceptance criteria',
              'Alternatives considered',
              'Implementation ideas',
            ]}
          />
          <FeatureCard
            index={2}
            isInView={isInView}
            icon={<LifeBuoy className="w-5 h-5 text-[#60a5fa]" />}
            title="Support Requests"
            desc="Clear intake path for help-seeking users"
            items={[
              'Specific question or problem',
              'What the user has already tried',
              'Environment and configuration details',
              'Relevant logs or screenshots',
            ]}
          />
        </div>

        {/* Extra features row */}
        <motion.div
          className="grid sm:grid-cols-3 gap-4 mt-4"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: CARD_EASE }}
        >
          <div className="flex items-start gap-3 bg-[#0a0a0a] rounded-xl border border-white/5 p-4">
            <Download className="w-4 h-4 text-[#6366f1] mt-0.5" />
            <div>
              <span className="text-gray-300 text-xs font-medium">One-click download</span>
              <p className="text-gray-500 text-[10px] mt-0.5">Export .md + .yml files ready for .github/ISSUE_TEMPLATE/</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-[#0a0a0a] rounded-xl border border-white/5 p-4">
            <FileText className="w-4 h-4 text-[#6366f1] mt-0.5" />
            <div>
              <span className="text-gray-300 text-xs font-medium">Live preview</span>
              <p className="text-gray-500 text-[10px] mt-0.5">See exactly what contributors will see before you export</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-[#0a0a0a] rounded-xl border border-white/5 p-4">
            <Github className="w-4 h-4 text-[#6366f1] mt-0.5" />
            <div>
              <span className="text-gray-300 text-xs font-medium">GitHub-ready output</span>
              <p className="text-gray-500 text-[10px] mt-0.5">Uses YAML frontmatter — drop into any repo</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
