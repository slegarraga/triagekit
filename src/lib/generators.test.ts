import { describe, expect, it } from 'vitest'
import {
  generateChecklist,
  generateConfig,
  generateMarkdown,
  type FormState,
} from './generators'

function form(overrides: Partial<FormState> = {}): FormState {
  return {
    type: 'bug-report',
    projectName: 'My Cool Project',
    repoUrl: '',
    additionalFields: '',
    ...overrides,
  }
}

describe('generateMarkdown', () => {
  it('writes bug-report frontmatter with the right name, about, title and labels', () => {
    const md = generateMarkdown(form({ type: 'bug-report' }))

    expect(md).toContain('name: Bug Report')
    expect(md).toContain('about: Report unexpected behavior')
    expect(md).toContain("title: '[bug]: '")
    expect(md).toContain("labels: ['bug']")
  })

  it('writes feature-request frontmatter with the enhancement label', () => {
    const md = generateMarkdown(form({ type: 'feature-request' }))

    expect(md).toContain('name: Feature Request')
    expect(md).toContain('about: Suggest a new feature')
    expect(md).toContain("title: '[enhancement]: '")
    expect(md).toContain("labels: ['enhancement']")
  })

  it('writes support-request frontmatter with the question label', () => {
    const md = generateMarkdown(form({ type: 'support-request' }))

    expect(md).toContain('name: Support Request')
    expect(md).toContain('about: Ask for help')
    expect(md).toContain("title: '[question]: '")
    expect(md).toContain("labels: ['question']")
  })

  it('includes the bug report body sections', () => {
    const md = generateMarkdown(form({ type: 'bug-report' }))

    for (const section of [
      '### Description',
      '### Steps to Reproduce',
      '### Expected Behavior',
      '### Actual Behavior',
      '### Environment',
    ]) {
      expect(md).toContain(section)
    }
  })

  it('includes the feature request body sections', () => {
    const md = generateMarkdown(form({ type: 'feature-request' }))

    for (const section of [
      '### Problem Statement',
      '### Proposed Solution',
      '### Alternatives Considered',
    ]) {
      expect(md).toContain(section)
    }
    // Sections from other template types must not leak in.
    expect(md).not.toContain('### Steps to Reproduce')
  })

  it('includes the support request body sections', () => {
    const md = generateMarkdown(form({ type: 'support-request' }))

    expect(md).toContain('### Question')
    expect(md).toContain("### What I've Tried")
  })

  it('appends additional fields under their own heading', () => {
    const without = generateMarkdown(form())
    const withExtra = generateMarkdown(form({ additionalFields: 'Commit: abc123' }))

    expect(without).not.toContain('### Additional Fields')
    expect(withExtra).toContain('### Additional Fields')
    expect(withExtra).toContain('Commit: abc123')
  })

  it('falls back to your-project when the project name is empty', () => {
    const md = generateMarkdown(form({ projectName: '', repoUrl: '' }))

    expect(md).toContain('Thanks for contributing to your-project!')
    expect(md).toContain('https://github.com/username/your-project')
  })

  it('uses the provided repo URL instead of the placeholder', () => {
    const md = generateMarkdown(form({ repoUrl: 'https://github.com/acme/widget/' }))

    expect(md).toContain('Thanks for contributing to my-cool-project!')
    expect(md).toContain('https://github.com/acme/widget/')
    expect(md).not.toContain('username/my-cool-project')
  })
})

describe('generateConfig', () => {
  it('lists an entry for every template type with its label link', () => {
    const cfg = generateConfig(form())

    expect(cfg).toMatch(/- name: Bug Report\s*\n\s*about: Report unexpected behavior/)
    expect(cfg).toMatch(/- name: Feature Request\s*\n\s*about: Suggest a new feature/)
    expect(cfg).toMatch(/- name: Support Request\s*\n\s*about: Ask for help/)
    expect(cfg).toContain('labels=bug')
    expect(cfg).toContain('labels=enhancement')
    expect(cfg).toContain('labels=question')
  })

  it('disables blank issues and names the project in the header', () => {
    const cfg = generateConfig(form({ projectName: 'My Cool Project' }))

    expect(cfg).toContain('blank_issues_enabled: false')
    expect(cfg).toContain('# My Cool Project issue-template directory config')
  })

  it('falls back to your-project when the project name is empty', () => {
    const cfg = generateConfig(form({ projectName: '' }))

    expect(cfg).toContain('# your-project issue-template directory config')
  })

  it('builds new-issue URLs from the repo URL, stripping trailing slashes', () => {
    const cfg = generateConfig(form({ repoUrl: 'https://github.com/acme/widget/' }))

    expect(cfg).toContain(
      'url: https://github.com/acme/widget/issues/new?labels=bug',
    )
    expect(cfg).not.toContain('username/my-cool-project')
  })
})

describe('generateChecklist', () => {
  it('returns bug-specific checklist items', () => {
    const cl = generateChecklist(form({ type: 'bug-report' }))

    expect(cl).toContain('- [ ] Bug title is descriptive and includes affected area')
    expect(cl).not.toContain('labeled as `enhancement`')
  })

  it('returns feature-request-specific checklist items', () => {
    const cl = generateChecklist(form({ type: 'feature-request' }))

    expect(cl).toContain('- [ ] Issue is labeled as `enhancement`')
    expect(cl).toContain('- [ ] Problem statement clearly describes the motivation')
    expect(cl).not.toContain('- [ ] Bug title is descriptive')
  })

  it('returns support-request-specific checklist items', () => {
    const cl = generateChecklist(form({ type: 'support-request' }))

    expect(cl).toContain('- [ ] Issue is labeled as `question`')
    expect(cl).toContain("- [ ] User has described what they've already tried")
    expect(cl).not.toContain('- [ ] Bug title is descriptive')
  })

  it('puts the project name in the header', () => {
    const cl = generateChecklist(form({ projectName: 'My Cool Project' }))

    expect(cl).toContain('# Triage Checklist — My Cool Project')
    expect(cl).toContain('## Bug Report')
  })

  it('includes maintainer-note placeholders', () => {
    const cl = generateChecklist(form())

    expect(cl).toContain('- **Severity:** `low / medium / high / critical`')
    expect(cl).toContain('- **Priority:** `P0 / P1 / P2 / P3`')
    expect(cl).toContain('- **Milestone:** `v0.0.0`')
    expect(cl).toContain('- **Assignee:** <!-- @username -->')
  })
})
