import { motion, useInView } from 'framer-motion'
import { ArrowDown, Github } from 'lucide-react'
import { useRef } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="min-h-[80vh] flex items-center justify-center px-4 md:px-6 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-[#818cf8] text-xs font-medium">
            <Github className="w-3.5 h-3.5" />
            For open-source maintainers
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-gray-100 leading-[0.95] tracking-tight"
        >
          Issue templates,<br />
          <span className="text-gray-500">generated in seconds.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          className="text-gray-500 text-sm sm:text-base mt-6 max-w-xl mx-auto leading-relaxed"
        >
          TriageKit helps open-source maintainers create polished, consistent issue templates —
          bug reports, feature requests, and support requests — so you can spend less time
          triaging and more time building.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          className="mt-10"
        >
          <a
            href="#generator"
            className="inline-flex items-center gap-2 bg-gray-100 text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-all"
          >
            Start generating
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-2">
              <div className="w-1 h-2 rounded-full bg-gray-500" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
