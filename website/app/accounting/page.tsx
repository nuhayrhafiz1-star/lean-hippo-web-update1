import type { Metadata } from "next";
import { Accounting } from "../components/Accounting";

const SITE_URL = "https://leanhippo.io";

export const metadata: Metadata = {
  title: "Accounting & Financial Services — Financial Control as One System",
  description:
    "Lean Hippo's Accounting wing: accounting, payroll, tax, compliance, entity formation, advisory, and audit run as one connected operating layer — accurate numbers, cash-flow visibility, and audit-ready governance.",
  alternates: { canonical: `${SITE_URL}/accounting` },
  openGraph: {
    title: "Accounting & Financial Services · Lean Hippo",
    description:
      "Financial control, visibility, and governance as one system — reporting, payroll, tax, compliance, formation, advisory, and audit.",
    url: `${SITE_URL}/accounting`,
    type: "website",
  },
};

export default function AccountingPage() {
  return <Accounting />;
}
