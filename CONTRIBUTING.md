# Contributing to TriageKit

Thanks for contributing! This project is small by design, so the fastest path
to a helpful contribution is usually a focused bug fix, a clearer copy change,
or a small UI improvement.

## Running the project

Prerequisites: Node.js and npm.

```sh
npm install
npm run dev      # start the dev server
npm run build    # typecheck and build for production
npm run preview  # preview the production build
```

## Finding something to work on

- Look for issues labeled `good first issue`.
- Comment on the issue to claim it before opening a pull request.
- If an issue is already claimed, pick another one.
- Prefer small, self-contained changes so reviews stay fast.

## Branch and PR conventions

- Create a branch named for the change, for example `fix/mobile-overflow` or
  `docs/contributing`.
- Open one pull request per change.
- Reference the issue in the PR description with `Fixes #123` or
  `Refs #123`.
- Keep the diff focused on the issue; avoid unrelated reformatting.

## Commit messages

Use concise conventional-style commit messages:

```text
fix: prevent mobile layout overflow
docs: add contributor guide
feat: add keyboard navigation
```

## Before opening a PR

1. Run `npm run build` to verify the typecheck and production build.
2. Test the change in the dev server.
3. Check the rendered UI at desktop and mobile widths when the change touches
   layout.

## Code of conduct

All contributors are expected to follow the
[Code of Conduct](CODE_OF_CONDUCT.md).
