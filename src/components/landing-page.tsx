"use client";

import { useMemo, useState } from "react";

import {
  buildChecklistMarkdown,
  buildConfigYaml,
  buildIssueFormYaml,
  type MaintainerKitConfig,
  type ProjectType,
} from "@/lib/maintainer-kit";

const starterConfig: MaintainerKitConfig = {
  projectName: "Triagekit",
  projectType: "library",
  maintainerEmail: "maintainers@example.com",
  docsUrl: "https://github.com/owner/repo/discussions",
  labels: ["bug", "needs-triage"],
  requireReproduction: true,
  requireEnvironment: true,
  requireScreenshots: true,
  includeSupportRedirect: true,
};

const projectTypeCopy: Record<ProjectType, { eyebrow: string; description: string }> = {
  library: {
    eyebrow: "Dependency-friendly intake",
    description: "Good for npm packages, SDKs, and framework extensions where maintainers need exact versions and integration context.",
  },
  cli: {
    eyebrow: "Command-first bug reports",
    description: "Best for CLIs where command output, shell, and operating system details decide whether a bug is actionable.",
  },
  action: {
    eyebrow: "Workflow-aware reports",
    description: "Built for GitHub Actions and automation projects where runner image and workflow snippets are part of the repro.",
  },
};

const valuePoints = [
  {
    label: "Maintainer Pain",
    value: "low-signal issues",
    copy: "Most queues fill with missing repros, vague titles, and support requests disguised as bugs.",
  },
  {
    label: "What This Ships",
    value: "forms + triage",
    copy: "Generate a stricter issue form, a support redirect config, and a reusable triage checklist.",
  },
  {
    label: "Why It Matters",
    value: "faster first response",
    copy: "The shortest path to OSS impact is saving maintainers time on the first round-trip.",
  },
];

const launchSteps = [
  "Tune the generator for one repo and commit the templates under `.github/ISSUE_TEMPLATE`.",
  "Publish the generated files in a small public repo with before/after screenshots of issue quality.",
  "Turn the generator rules into a reusable GitHub Action or hosted template picker next.",
];

const toggleFields: Array<{
  key: keyof Pick<
    MaintainerKitConfig,
    "requireReproduction" | "requireEnvironment" | "requireScreenshots" | "includeSupportRedirect"
  >;
  label: string;
}> = [
  { key: "requireReproduction", label: "Require a reproduction path" },
  { key: "requireEnvironment", label: "Require environment details" },
  { key: "requireScreenshots", label: "Ask for logs or screenshots" },
  { key: "includeSupportRedirect", label: "Generate support contact links" },
];

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button className="button-shell" onClick={handleCopy} type="button">
      {copied ? `Copied ${label}` : `Copy ${label}`}
    </button>
  );
}

export function LandingPage() {
  const [config, setConfig] = useState(starterConfig);
  const activeProjectType = projectTypeCopy[config.projectType];

  const issueYaml = useMemo(() => buildIssueFormYaml(config), [config]);
  const configYaml = useMemo(() => buildConfigYaml(config), [config]);
  const checklist = useMemo(() => buildChecklistMarkdown(config), [config]);

  function update<K extends keyof MaintainerKitConfig>(key: K, value: MaintainerKitConfig[K]) {
    setConfig((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="site-shell page">
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark">tk</span>
          <span>triagekit</span>
        </a>
        <nav className="nav-links" aria-label="primary">
          <a href="#generator">Generator</a>
          <a href="#outputs">Outputs</a>
          <a href="#launch">Launch plan</a>
        </nav>
        <div className="nav-actions">
          <a className="button button-secondary" href="#outputs">
            Jump to files
          </a>
          <a className="button button-primary" href="#generator">
            Build your intake kit
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid">
          <div>
            <span className="label">Open source maintainer workflow</span>
            <h1>Turn vague GitHub issues into something maintainers can actually use.</h1>
            <p>
              Triagekit generates stricter issue forms, support redirects, and a maintainer checklist so small OSS
              projects can cut triage time without building a whole support system first.
            </p>

            <div className="button-row" style={{ marginTop: 24 }}>
              <a className="button button-primary" href="#generator">
                Start with the generator
              </a>
              <a className="button button-secondary" href="#launch">
                See the rollout plan
              </a>
            </div>

            <div className="stats-row">
              {valuePoints.map((item) => (
                <article className="stat-card" key={item.label}>
                  <span className="label">{item.label}</span>
                  <strong>{item.value}</strong>
                  <p className="mini-copy">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="stack" aria-hidden="true">
            <article className="stack-card">
              <span className="label">Bug report quality</span>
              <h3>Ask for repros before maintainers have to.</h3>
              <p>Generated templates require the exact details that turn a complaint into an actionable bug report.</p>
            </article>
            <article className="stack-card">
              <span className="label">Queue hygiene</span>
              <h3>Redirect support requests out of the bug tracker.</h3>
              <p>Contact links and clearer form copy keep the issue queue focused on genuine defects and regressions.</p>
            </article>
            <article className="stack-card">
              <span className="label">Maintainer muscle memory</span>
              <h3>Standardize the first five minutes of triage.</h3>
              <p>A reusable checklist helps maintainers label, verify, and close reports consistently.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-head" id="generator">
        <span className="label">Generator</span>
        <h2>Shape the intake flow for your repo.</h2>
        <p>
          Start with one repository type, decide what evidence maintainers need, and the page generates the files you
          can drop into GitHub today.
        </p>
      </section>

      <section className="generator-grid">
        <article className="composer">
          <span className="label">{activeProjectType.eyebrow}</span>
          <h3>Project settings</h3>
          <p>{activeProjectType.description}</p>

          <div className="form-grid">
            <label className="field">
              <span className="field-label">Project name</span>
              <input
                onChange={(event) => update("projectName", event.target.value)}
                placeholder="Triagekit"
                type="text"
                value={config.projectName}
              />
            </label>

            <label className="field">
              <span className="field-label">Project type</span>
              <select
                className="select-field"
                onChange={(event) => update("projectType", event.target.value as ProjectType)}
                value={config.projectType}
              >
                <option value="library">Library / SDK</option>
                <option value="cli">CLI tool</option>
                <option value="action">GitHub Action</option>
              </select>
            </label>

            <label className="field">
              <span className="field-label">Maintainer contact</span>
              <input
                onChange={(event) => update("maintainerEmail", event.target.value)}
                placeholder="maintainers@example.com"
                type="email"
                value={config.maintainerEmail}
              />
            </label>

            <label className="field">
              <span className="field-label">Support / docs URL</span>
              <input
                onChange={(event) => update("docsUrl", event.target.value)}
                placeholder="https://github.com/owner/repo/discussions"
                type="url"
                value={config.docsUrl}
              />
            </label>

            <label className="field field-full">
              <span className="field-label">Default labels</span>
              <input
                onChange={(event) =>
                  update(
                    "labels",
                    event.target.value
                      .split(",")
                      .map((label) => label.trim())
                      .filter(Boolean),
                  )
                }
                placeholder="bug, needs-triage"
                type="text"
                value={config.labels.join(", ")}
              />
            </label>
          </div>

          <div className="check-list">
            {toggleFields.map((field) => (
              <label className="toggle-row" key={field.key}>
                <input
                  checked={config[field.key]}
                  onChange={(event) => update(field.key, event.target.checked)}
                  type="checkbox"
                />
                <span>{field.label}</span>
              </label>
            ))}
          </div>
        </article>

        <article className="preview-card">
          <span className="label">Why this path</span>
          <h3>Fastest credible OSS wedge</h3>
          <p>
            A maintainer tool is easier to ship than a whole platform, easier to explain than a generic AI product, and
            more likely to qualify as ecosystem-helpful even before it gets huge.
          </p>

          <div className="window">
            <div className="window-top">
              <span />
              <span />
              <span />
            </div>
            <div className="window-body">
              <h3>What this generator produces</h3>
              <div className="mini-list">
                <div className="mini-item">
                  <span>Bug issue form</span>
                  <span className="pill">YAML</span>
                </div>
                <div className="mini-item">
                  <span>Contact link config</span>
                  <span className="pill">config</span>
                </div>
                <div className="mini-item">
                  <span>Maintainer checklist</span>
                  <span className="pill">markdown</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="section-head" id="outputs">
        <span className="label">Outputs</span>
        <h2>Drop these files into a public repo and iterate from there.</h2>
        <p>
          These are designed to be immediately useful. Start with one repository, improve issue quality, then package
          the generator or templates for other maintainers.
        </p>
      </section>

      <section className="output-grid">
        <article className="stage-card">
          <div className="output-header">
            <div>
              <span className="label">Issue form</span>
              <h3>{config.projectName.toLowerCase().replace(/\s+/g, "-") || "project"}-bug-report.yml</h3>
            </div>
            <CopyButton label="issue form" value={issueYaml} />
          </div>
          <pre className="code-panel">{issueYaml}</pre>
        </article>

        <article className="stage-card">
          <div className="output-header">
            <div>
              <span className="label">Config</span>
              <h3>config.yml</h3>
            </div>
            <CopyButton label="config" value={configYaml} />
          </div>
          <pre className="code-panel">{configYaml}</pre>
        </article>

        <article className="stage-card output-full">
          <div className="output-header">
            <div>
              <span className="label">Maintainer playbook</span>
              <h3>TRIAGE.md</h3>
            </div>
            <CopyButton label="triage guide" value={checklist} />
          </div>
          <pre className="code-panel">{checklist}</pre>
        </article>
      </section>

      <section className="section-head" id="launch">
        <span className="label">Launch</span>
        <h2>How I’d turn this into a qualifying OSS project next.</h2>
        <p>
          The goal is not to fake scale. The goal is to ship one obviously useful maintainer workflow, use it yourself,
          and make it easy for other repos to adopt.
        </p>
      </section>

      <section className="feature-grid">
        {launchSteps.map((step, index) => (
          <article className="feature-card" key={step}>
            <span className="label">0{index + 1}</span>
            <h3>{index === 0 ? "Use it yourself" : index === 1 ? "Publish proof" : "Expand the wedge"}</h3>
            <p>{step}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
