import type { Metadata } from "next";
import CoverLetter from "@/components/CoverLetter";

export const metadata: Metadata = {
	title: "Russell Palma — Cover Letter",
};

export default function CoverLetterPage() {
	return <CoverLetter />;
}
