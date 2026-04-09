import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Triagekit | GitHub Intake Generator for OSS Maintainers",
  description: "Generate stricter GitHub issue forms, support redirects, and triage checklists for open-source maintainers.",
};

export default function HomePage() {
  return <LandingPage />;
}
