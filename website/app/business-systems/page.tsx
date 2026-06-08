import type { Metadata } from "next";
import { BusinessSystems } from "../components/BusinessSystems";

const SITE_URL = "https://leanhippo.io";

export const metadata: Metadata = {
  title: "Business Systems — One Connected Operating System",
  description:
    "The Lean Hippo Business Systems wing: a connected operating system across visibility, money (P&L, cash flow), customers, knowledge, procurement, and AI decisions — with human approval and full auditability.",
  alternates: { canonical: `${SITE_URL}/business-systems` },
  openGraph: {
    title: "Business Systems — One Connected Operating System · Lean Hippo",
    description:
      "Dashboards, workflows, databases, automation, and AI intelligence installed as one control layer. The Control Room, The Vault, The Switchboard, The Playbook, The Supply Line, and The Mind.",
    url: `${SITE_URL}/business-systems`,
    type: "website",
  },
};

export default function BusinessSystemsPage() {
  return <BusinessSystems />;
}
