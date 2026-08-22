import { useState, useCallback } from 'react'
import { Hero } from './components/Hero'
import { Generator } from './components/Generator'
import { Features } from './components/Features'
import { generateMarkdown, generateConfig, generateChecklist } from './lib/generators'
import type { FormState, TemplateType } from './lib/generators'

export type { FormState, TemplateType } from './lib/generators'

export interface GeneratedOutputs {
  markdown: string
  config: string
  checklist: string
}

const INITIAL_FORM_STATE: FormState = {
  projectName: '',
  repoUrl: '',
  type: 'bug-report',
  additionalFields: '',
}

const TYPES: { value: TemplateType; label: string; desc: string }[] = [
  { value: 'bug-report', label: 'Bug Report', desc: 'Report unexpected behavior' },
  { value: 'feature-request', label: 'Feature Request', desc: 'Suggest a new feature' },
  { value: 'support-request', label: 'Support Request', desc: 'Ask for help' },
]

export default function App() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE)

  const update = useCallback((patch: Partial<FormState>) => {
    setForm(prev => ({ ...prev, ...patch }))
  }, [])

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM_STATE)
  }, [])

  const outputs: GeneratedOutputs = {
    markdown: generateMarkdown(form),
    config: generateConfig(form),
    checklist: generateChecklist(form),
  }

  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <Generator form={form} update={update} reset={resetForm} outputs={outputs} types={TYPES} />
      <Features />
    </main>
  )
}
