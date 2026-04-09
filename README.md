# Triagekit

Triagekit is a small OSS tool for maintainers who are tired of low-signal GitHub issues.

It ships a polished Next.js generator that helps maintainers produce:

- stricter bug report forms
- issue tracker contact-link rules
- a repeatable `TRIAGE.md` checklist for first response

The repo also uses its own generated templates under `.github/ISSUE_TEMPLATE`, so the project is dogfooding the workflow it is trying to improve.

## Why this exists

Smaller open-source projects often lose time in the first round-trip:

- the title is vague
- the issue is really a support request
- the repro steps are incomplete
- environment details are missing
- maintainers answer the same intake questions over and over

Triagekit focuses on that first five-minute maintainer workflow.

## What is in this repo

- `src/components/landing-page.tsx`
  The product page and interactive generator UI.
- `src/lib/maintainer-kit.ts`
  The pure generation logic for issue-form YAML, contact-link config, and triage markdown.
- `.github/ISSUE_TEMPLATE/`
  Example generated templates used by this repo itself.
- `examples/`
  Copy-pasteable sample outputs for different project types.
- `TRIAGE.md`
  The maintainers' first-response checklist.

## Local development

```bash
npm install
npm run dev
```

Checks:

```bash
npm run typecheck
npm run lint
```

## Using Triagekit on your repo

1. Open the app locally.
2. Configure your project type and required evidence.
3. Copy the generated files into:
   - `.github/ISSUE_TEMPLATE/<your-project>-bug-report.yml`
   - `.github/ISSUE_TEMPLATE/config.yml`
   - `TRIAGE.md`
4. Commit the files and start triaging with the checklist.

## Current status

This is the first public cut of the project.

Current proof points:

- the generator is implemented and lint-clean
- the repo is using generated issue templates on itself
- the project includes examples for library and GitHub Action style repos
- CI is included for typecheck and lint validation

## Roadmap

- export files as a downloadable zip
- save named presets for multiple repos
- generate support-request and feature-request templates
- add a GitHub Action mode that comments when submitted issues miss required signals
- collect before/after screenshots and maintainer case studies

## Contributing

See `CONTRIBUTING.md`.

## Security

See `SECURITY.md`.

## License

MIT
