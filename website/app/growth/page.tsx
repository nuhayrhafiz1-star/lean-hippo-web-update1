import type { Metadata } from "next";
import { Growth } from "../components/Growth";

const SITE_URL = "https://leanhippo.io";

export const metadata: Metadata = {
  title: "Growth & Marketing — The Machine Behind Growth",
  description:
    "Lean Hippo's Growth wing: brand, content, social, paid, campaigns, websites, CRM, follow-up, retention, and visibility installed as one connected growth system — with MIND+ intelligence on top.",
  alternates: { canonical: `${SITE_URL}/growth` },
  openGraph: {
    title: "Growth & Marketing · Lean Hippo",
    description:
      "We build the machine behind growth — twelve connected products that turn attention into revenue, not isolated marketing services.",
    url: `${SITE_URL}/growth`,
    type: "website",
  },
};

export default function GrowthPage() {
  return <Growth />;
}
