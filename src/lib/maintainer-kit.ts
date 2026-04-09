export type ProjectType = "library" | "cli" | "action";

export type MaintainerKitConfig = {
  projectName: string;
  projectType: ProjectType;
  maintainerEmail: string;
  docsUrl: string;
  labels: string[];
  requireReproduction: boolean;
  requireEnvironment: boolean;
  requireScreenshots: boolean;
  includeSupportRedirect: boolean;
};

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "project";
}

function quote(value: string) {
  return JSON.stringify(value);
}

function indent(lines: string[], spaces = 2) {
  const prefix = " ".repeat(spaces);
  return lines.map((line) => `${prefix}${line}`);
}

function bodyBlock(lines: string[]) {
  return indent(lines, 2).join("\n");
}

export function buildIssueFormYaml(config: MaintainerKitConfig) {
  const lines: string[] = [
    `name: ${quote(`${config.projectName} bug report`)}`,
    `description: ${quote(`Report a reproducible problem in ${config.projectName}.`)}`,
    `title: ${quote(`[bug]: `)}`,
    `labels: [${config.labels.map(quote).join(", ")}]`,
    "body:",
  ];

  const body: string[] = [
    "- type: markdown",
    "  attributes:",
    `    value: ${quote(`Thanks for helping improve ${config.projectName}. Please fill out the sections below so maintainers can reproduce the issue quickly.`)}`,
    "- type: textarea",
    "  id: summary",
    "  attributes:",
    `    label: ${quote("What happened?")}`,
    `    description: ${quote("A short description of the bug and the impact.")}`,
    `    placeholder: ${quote("When I run ... I expected ... but ...")}`,
    "  validations:",
    "    required: true",
  ];

  if (config.requireReproduction) {
    body.push(
      "- type: textarea",
      "  id: reproduction",
      "  attributes:",
      `    label: ${quote("How can we reproduce it?")}`,
      `    description: ${quote("List the smallest set of steps a maintainer can follow.")}`,
      `    placeholder: ${quote("1. Install ...\n2. Run ...\n3. Observe ...")}`,
      "  validations:",
      "    required: true",
    );
  }

  body.push(
    "- type: textarea",
    "  id: expected",
    "  attributes:",
    `    label: ${quote("What did you expect to happen?")}`,
    `    placeholder: ${quote("Expected ...")}`,
    "  validations:",
    "    required: true",
  );

  if (config.requireEnvironment) {
    const envPrompt =
      config.projectType === "cli"
        ? "OS, shell, Node/runtime version, package manager, and exact command"
        : config.projectType === "action"
          ? "GitHub runner image, workflow snippet, action version, and related secrets/config"
          : "OS, runtime version, package manager, framework version, and related integrations";

    body.push(
      "- type: textarea",
      "  id: environment",
      "  attributes:",
      `    label: ${quote("Environment")}`,
      `    description: ${quote(envPrompt)}`,
      `    placeholder: ${quote(envPrompt)}`,
      "  validations:",
      "    required: true",
    );
  }

  if (config.requireScreenshots) {
    body.push(
      "- type: textarea",
      "  id: evidence",
      "  attributes:",
      `    label: ${quote("Logs, screenshots, or failing output")}`,
      `    description: ${quote("Paste the shortest relevant logs or attach screenshots.")}`,
      `    render: ${quote("shell")}`,
      "  validations:",
      "    required: false",
    );
  }

  body.push(
    "- type: checkboxes",
    "  id: checks",
    "  attributes:",
    `    label: ${quote("Before submitting")}`,
    "    options:",
    `      - label: ${quote("I searched existing issues and did not find a duplicate.")}`,
    `      - label: ${quote(`I can still reproduce this on the latest ${config.projectName} version.`)}`,
    `      - label: ${quote("I included enough detail for a maintainer to verify the issue.")}`,
    "  validations:",
    "    required: true",
  );

  lines.push(bodyBlock(body));
  return lines.join("\n");
}

export function buildConfigYaml(config: MaintainerKitConfig) {
  if (!config.includeSupportRedirect) {
    return "blank_issues_enabled: false";
  }

  const supportUrl = config.docsUrl || "https://github.com/OWNER/REPO/discussions";
  const contactLink = config.maintainerEmail ? `mailto:${config.maintainerEmail}` : supportUrl;

  return [
    "blank_issues_enabled: false",
    "contact_links:",
    `  - name: ${quote(`${config.projectName} usage question`)}`,
    `    url: ${quote(supportUrl)}`,
    `    about: ${quote("Please use discussions or documentation questions for general support.")}`,
    `  - name: ${quote("Security or sensitive report")}`,
    `    url: ${quote(contactLink)}`,
    `    about: ${quote("Use this channel for sensitive disclosures rather than a public issue.")}`,
  ].join("\n");
}

export function buildChecklistMarkdown(config: MaintainerKitConfig) {
  const slug = toSlug(config.projectName);
  const supportLine = config.includeSupportRedirect
    ? `- Move usage questions to \`${config.docsUrl || "Discussions"}\` instead of tracking them as bugs.`
    : `- Close support-style tickets quickly so the issue queue stays focused on defects.`;

  return [
    `# ${config.projectName} maintainer triage checklist`,
    "",
    "Use this checklist when a new issue arrives.",
    "",
    "## 1. Intake",
    "- Confirm the report used the issue form.",
    "- Confirm the title states the failure, not just a symptom.",
    supportLine,
    "",
    "## 2. Reproduction quality",
    `- Can a maintainer reproduce it from the details in \`.github/ISSUE_TEMPLATE/${slug}-bug-report.yml\`?`,
    `- If not, ask for the smallest repro, exact version, and environment details.`,
    "- Remove noise and ask for only the logs that change the diagnosis.",
    "",
    "## 3. Routing",
    "- Add subsystem labels immediately.",
    "- Mark confirmed regressions separately from first-time bug reports.",
    "- Link duplicates instead of carrying parallel conversations.",
    "",
    "## 4. Exit rules",
    "- Close reports that never become reproducible after follow-up.",
    "- Convert well-scoped bugs into issues with owner, severity, and next action.",
    "- Capture recurring confusion as docs fixes or FAQ updates.",
  ].join("\n");
}
