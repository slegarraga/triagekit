# Triagekit maintainer triage checklist

Use this checklist when a new issue arrives.

## 1. Intake

- Confirm the report used the issue form.
- Confirm the title states the failure, not just a symptom.
- Move usage questions to `https://github.com/zanni098/triagekit/discussions` instead of tracking them as bugs once discussions are enabled.

## 2. Reproduction quality

- Can a maintainer reproduce it from the details in `.github/ISSUE_TEMPLATE/triagekit-bug-report.yml`?
- If not, ask for the smallest repro, exact version, and environment details.
- Remove noise and ask for only the logs that change the diagnosis.

## 3. Routing

- Add subsystem labels immediately.
- Mark confirmed regressions separately from first-time bug reports.
- Link duplicates instead of carrying parallel conversations.

## 4. Exit rules

- Close reports that never become reproducible after follow-up.
- Convert well-scoped bugs into issues with owner, severity, and next action.
- Capture recurring confusion as docs fixes or FAQ updates.
