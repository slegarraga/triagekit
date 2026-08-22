# TriageKit

**GitHub issue intake generator for open-source maintainers.**

TriageKit helps you create polished, consistent GitHub issue templates in seconds. Choose from three template types, customize the fields, and download ready-to-use `.md` and `.yml` files for your `.github/ISSUE_TEMPLATE/` directory.

## Features

- **Bug Reports** — Standardized format with reproduction steps, environment details, and screenshot/log sections
- **Feature Requests** — Structured proposals with problem statements, solutions, alternatives, and implementation ideas
- **Support Requests** — Clear intake path for help-seeking users with troubleshooting context
- **Live Preview** — See exactly what contributors will see before you export
- **One-click Download** — Export individual files or bulk download all outputs
- **Copy to Clipboard** — Quick copy of any generated template
- **GitHub-ready Output** — YAML frontmatter, proper labels, and sensible filenames

## Usage

1. Go to [triagekit](https://zanni098.github.io/triagekit)
2. Pick a template type (Bug Report, Feature Request, or Support Request)
3. Enter your project name and optional repo URL
4. Add any custom sections you need
5. Preview the generated output
6. Download the files and drop them into `.github/ISSUE_TEMPLATE/` in your repo

## Development

```bash
npm install
npm run dev     # Start dev server
npm run build   # Build for production
npm run preview # Preview production build
npm test        # Run unit tests (Vitest + React Testing Library)
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to find an issue, claim it, and
open a pull request.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS 3
- Framer Motion

## License

MIT
