import Link from "next/link";
import { asset } from "@/lib/base-path";

const experience = [
	{
		years: "2025 — Present",
		company: "Park My Ride",
		title: "CTO & Full-Stack Platform Engineer",
		detail:
			"Event parking and valet marketplace plus the platform under it. Django API, Stripe Connect, React Native and SwiftUI clients, and Hermes agents on an LLM gateway that fails over Groq, OpenRouter, Gemini, NVIDIA, and Hugging Face. The gateway routes chat, vision, image, and audio, and transcribes with Whisper.",
	},
	{
		years: "2024 — Present",
		company: "Four Square Clinicals",
		title: "Full-Stack Developer",
		detail:
			"Intake scoring and summary PDFs. Documents are embedded in Pinecone, retrieved with LangChain, and written up by Claude, including GAD. Summaries go out through Microsoft Graph on Azure.",
	},
	{
		years: "2024",
		company: "Ovation",
		title: "Full-Stack Developer",
		detail:
			"NFT social product on Cosmos. TypeScript services, React and Next.js, and the Archway wallet SDK for on-chain actions.",
	},
	{
		years: "2020 — 2021, 2024 — Present",
		company: "Loma Linda Psychiatric Medical Group",
		title: "Full-Stack Developer / IT Administrator",
		detail:
			"Document OCR with EasyOCR, PyTorch, and TensorFlow, and a phone IVR that transcribes with Whisper, speaks with text-to-speech, and keeps the call in SIP and RingCentral.",
	},
	{
		years: "2022 — 2023",
		company: "Obinsun, Inc.",
		title: "Full-Stack Developer",
		detail:
			"Printful drop-shipping store. TypeScript, Next.js, Django, and Stripe, with Jest and Playwright around the API.",
	},
	{
		years: "2021 — 2022",
		company: "GreenspotHub",
		title: "Full-Stack Developer",
		detail:
			"Next.js server rendering, Tailwind, and NextAuth for the studio site, deployed on Vercel.",
	},
];

const skills = [
	["Python / Django", "90%"],
	["TypeScript / Next.js", "90%"],
	["LLMs, RAG, speech", "85%"],
	["React / React Native", "85%"],
	["Docker / CI", "80%"],
];

export default function CoverLetter() {
	return (
		<div className="body1">
			<Link className="mainWebsite" href="/">
				<i className="fa fa-arrow-left" aria-hidden="true" /> Back to main website
			</Link>

			<div className="container0">
				<div className="left_Side">
					<div className="profileText">
						<div className="imgBx0">
							<img src={asset("/images/header.jpg")} alt="Russell Palma" />
						</div>
						<h2>
							Russell Palma
							<br />
							<span>Full-Stack & Platform Engineer</span>
						</h2>
					</div>

					<div className="contactInfo">
						<h3 className="title0">Contact Info</h3>
						<ul>
							<li>
								<span className="icon">
									<i className="fa fa-phone" aria-hidden="true" />
								</span>
								<span className="text">+1 909 289 5924</span>
							</li>
							<li>
								<span className="icon">
									<i className="fa fa-envelope-o" aria-hidden="true" />
								</span>
								<span className="text">me@russellpalma.com</span>
							</li>
							<li>
								<span className="icon">
									<i className="fa fa-globe" aria-hidden="true" />
								</span>
								<span className="text">russellpalma.com</span>
							</li>
							<li>
								<span className="icon">
									<i className="fa fa-link" aria-hidden="true" />
								</span>
								<span className="text">
									<a href="https://www.linkedin.com/in/russpalms">
										linkedin.com/in/russpalms
									</a>
								</span>
							</li>
							<li>
								<span className="icon">
									<i className="fa fa-map-marker" aria-hidden="true" />
								</span>
								<span className="text">Portland, TN</span>
							</li>
						</ul>
					</div>

					<div className="contactInfo education">
						<h3 className="title0">Education</h3>
						<ul>
							<li>
								<h5>2015 — 2020</h5>
								<h4>B.S. Computer Engineering</h4>
								<h4>Walla Walla University</h4>
							</li>
						</ul>
					</div>

					<div className="contactInfo language">
						<h3 className="title0">Languages</h3>
						<ul>
							<li>
								<span className="text">English</span>
								<span className="percent">
									<div style={{ width: "100%" }} />
								</span>
							</li>
							<li>
								<span className="text">Spanish</span>
								<span className="percent">
									<div style={{ width: "10%" }} />
								</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="right_Side">
					<div className="about0">
						<h2 className="title2">Profile</h2>
						<p className="p">
							I build full-stack products and the AI inside them. Recent work is an
							OpenAI-compatible model gateway with provider failover and separate paths
							for chat, vision, image, and audio; retrieval systems that embed documents
							in Pinecone and answer with LangChain; and speech pipelines that
							transcribe with Whisper, synthesize a reply, and leave the phone call in
							SIP.
							<br />
							<br />
							The same thread runs through marketplace APIs, native mobile, and clinic
							software: take the operational problem, ship the system, and keep the
							model behind a boundary the application controls.
						</p>
					</div>

					<div className="about0">
						<h2 className="title2">Experience</h2>
						{experience.map((job) => (
							<div className="box" key={job.company}>
								<div className="year_company">
									<h5>{job.years}</h5>
									<h5>{job.company}</h5>
								</div>
								<div className="text">
									<h4>{job.title}</h4>
									<p className="p">{job.detail}</p>
								</div>
							</div>
						))}
					</div>

					<div className="about0 skills">
						<h2 className="title2">Professional skills</h2>
						{skills.map(([label, width]) => (
							<div className="box" key={label}>
								<h4>{label}</h4>
								<div className="percent">
									<div style={{ width }} />
								</div>
							</div>
						))}
					</div>

					<div className="about0 interests">
						<h2 className="title2">Interests</h2>
						<ul>
							<li>
								<i className="fa fa-gamepad" aria-hidden="true" />
								Gaming
							</li>
							<li>
								<i className="fa fa-snowflake-o" aria-hidden="true" />
								Boarding
							</li>
							<li>
								<i className="fa fa-cutlery" aria-hidden="true" />
								Cooking
							</li>
							<li>
								<i className="fa fa-music" aria-hidden="true" />
								EDM
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
