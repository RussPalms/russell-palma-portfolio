"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { asset } from "@/lib/base-path";

type FieldErrors = {
	fullname?: boolean;
	email?: boolean;
	subject?: boolean;
	message?: boolean;
};

const projects = [
	{ href: "https://nexusconjure.com", mark: "NexusConjure", title: "NexusConjure" },
	{ href: "https://exotalk.com", mark: "Exotalk", title: "Exotalk" },
	{
		href: "https://lomalindapsych.com",
		mark: "LLPMG",
		title: "Loma Linda Psychiatric Medical Group",
	},
	{ href: "https://fsclinicals.com", mark: "FSClinicals", title: "Four Square Clinicals" },
	{ href: "https://nexusconjure.com/merchandise", mark: "Obinsun", title: "Obinsun" },
	{
		href: "https://nexusconjure.com/display",
		mark: "Green Spot Hub",
		title: "GreenSpotHub Productions",
	},
];

export default function Portfolio() {
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState<FieldErrors>({});
	const [buttonText, setButtonText] = useState("Send");
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showFailureMessage, setShowFailureMessage] = useState(false);
	const [failureText, setFailureText] = useState("");

	function closeMenu() {
		document.querySelector(".navigation")?.classList.remove("active");
		document.querySelector(".main")?.classList.remove("active");
	}

	useEffect(() => {
		const toggle = document.querySelector<HTMLElement>(".toggle");
		const topbar = document.querySelector(".topbar");
		const navigation = document.querySelector(".navigation");
		const main = document.querySelector(".main");
		const themeSwitch = document.querySelector<HTMLElement>(".themeSwitch");
		const body = document.body;
		if (!toggle || !topbar || !navigation || !main || !themeSwitch) {
			return;
		}

		const onToggle = () => {
			topbar.classList.toggle("active");
			navigation.classList.toggle("active");
			main.classList.toggle("active");
		};
		const onTheme = () => {
			body.classList.toggle("dark");
		};

		toggle.addEventListener("click", onToggle);
		themeSwitch.addEventListener("click", onTheme);
		return () => {
			toggle.removeEventListener("click", onToggle);
			themeSwitch.removeEventListener("click", onTheme);
		};
	}, []);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const nextErrors: FieldErrors = {
			fullname: fullname.trim().length < 2,
			email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
			subject: subject.trim().length < 2,
			message: message.trim().length < 2,
		};
		setErrors(nextErrors);
		if (Object.values(nextErrors).some(Boolean)) {
			return;
		}

		setButtonText("Sending");
		setShowSuccessMessage(false);
		setShowFailureMessage(false);

		try {
			const response = await fetch(`${asset("/api/contact")}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fullname: fullname.trim(),
					email: email.trim(),
					subject: subject.trim(),
					message: message.trim(),
				}),
			});
			const payload = (await response.json().catch(() => null)) as { error?: string } | null;
			if (!response.ok) {
				setShowFailureMessage(true);
				setFailureText(payload?.error || "The message could not be sent.");
				setButtonText("Send");
				return;
			}
			setShowSuccessMessage(true);
			setFullname("");
			setEmail("");
			setSubject("");
			setMessage("");
			setButtonText("Send");
		} catch {
			setShowFailureMessage(true);
			setFailureText("The message could not be sent. Email me@russellpalma.com directly.");
			setButtonText("Send");
		}
	}

	return (
		<div className="body0">
			<div className="navigation">
				<ul>
					<li>
						<a href="#banner" onClick={closeMenu}>
							Home
						</a>
					</li>
					<li>
						<a href="#about" onClick={closeMenu}>
							About
						</a>
					</li>
					<li>
						<a href="#projects" onClick={closeMenu}>
							Projects
						</a>
					</li>
					<li>
						<a href="#contact" onClick={closeMenu}>
							Contact
						</a>
					</li>
				</ul>
				<div className="themeSwitch" />
			</div>

			<div className="main">
				<div className="topbar">
					<a href="#banner" className="logo flex-nowrap">
						rPalm&apos;s Portfolio
					</a>
					<div className="toggle">
						<i className="fa fa-bars" aria-hidden="true" />
					</div>
				</div>

				<section className="banner" id="banner">
					<div className="content">
						<div className="imgBx">
							<img src={asset("/images/header.jpg")} alt="Russell Palma" />
						</div>
						<h3>Russell Palma</h3>
						<p>Full-stack engineer. Production AI, platforms, and mobile.</p>
						<Link className="btn" href="/resume">
							Cover Letter
						</Link>
						<ul className="socialMedia">
							<li>
								<a href="https://www.facebook.com/PinoyWakeboarder" aria-label="Facebook">
									<i className="fa fa-facebook" aria-hidden="true" />
								</a>
							</li>
							<li>
								<a href="https://www.instagram.com/rpalmpinoy/" aria-label="Instagram">
									<i className="fa fa-instagram" aria-hidden="true" />
								</a>
							</li>
							<li>
								<a href="https://www.linkedin.com/in/russpalms" aria-label="LinkedIn">
									<i className="fa fa-linkedin" aria-hidden="true" />
								</a>
							</li>
							<li>
								<a href="https://twitter.com/rPalmPinoy" aria-label="Twitter">
									<i className="fa fa-twitter" aria-hidden="true" />
								</a>
							</li>
						</ul>
					</div>
				</section>

				<section className="about adjust" id="about">
					<div className="title">
						<h2>About Me</h2>
					</div>
					<div className="content">
						<div className="textBox">
							<p className="p-4">
								Hello, my name is Russell Brian Fulache Dugaduga Jale (pronounced
								&quot;hall-ee&quot;) Palma. I am a full-stack and platform engineer. I build
								the product and the AI inside it: retrieval over real documents, gateways
								that fail over between model providers, and speech pipelines that stay
								under application control.
								<br />
								<br />
								I currently run Park My Ride, an event parking and valet marketplace, and
								the self-hosted platform around it. That includes Hermes and OpenClaw
								agents on an OpenAI-compatible LLM gateway. A request can move from Groq
								to OpenRouter, Gemini, NVIDIA, or Hugging Face when a provider is out of
								quota. The same gateway separates chat, vision, image, and audio, and it
								transcribes with Whisper.
								<br />
								<br />
								Client work follows the same pattern. For psychiatric clinics I embedded
								intake packets in Pinecone, retrieved them with LangChain, and had Claude
								write bounded scores and summaries, including GAD. A separate phone path
								transcribes with Whisper, speaks with text-to-speech, and leaves the call
								in SIP. I have also shipped PDF chat with history-aware retrieval,
								plan-gated GPT-4o replies for Instagram, and generation pipelines for
								music, images, and video.
								<br />
								<br />
								I studied computer engineering at Walla Walla University. I like taking an
								operational problem and turning it into software a team can keep running.
							</p>
						</div>
						<div className="imgBc">
							<img src={asset("/images/about.jpg")} alt="Russell Palma" />
						</div>
					</div>
				</section>

				<section className="projects adjust" id="projects">
					<div className="title">
						<h2>Recent Work</h2>
						<p>A few live sites. More of the portfolio is not deployed yet.</p>
					</div>
					<div className="content">
						{projects.map((project) => (
							<Link href={project.href} key={project.href}>
								<div className="workBx">
									<div className="imgBx">{project.mark}</div>
									<div className="textBx">
										<h3>{project.title}</h3>
									</div>
								</div>
							</Link>
						))}
					</div>
				</section>

				<section className="contact adjust" id="contact">
					<div className="title">
						<h2>Let&apos;s Say Hi</h2>
						<p>Leave your details and I will reply by email.</p>
					</div>
					<form className="contactForm" onSubmit={handleSubmit}>
						<div className="row">
							<input
								type="text"
								value={fullname}
								onChange={(event) => setFullname(event.target.value)}
								name="fullname"
								placeholder="Enter Your Full Name"
								autoComplete="name"
							/>
							{errors.fullname ? <span>Name is required.</span> : null}
						</div>
						<div className="row">
							<input
								type="email"
								name="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								placeholder="Enter Your E-Mail"
								autoComplete="email"
							/>
							{errors.email ? <span>A valid email is required.</span> : null}
							<input
								type="text"
								name="subject"
								value={subject}
								onChange={(event) => setSubject(event.target.value)}
								placeholder="Subject"
							/>
							{errors.subject ? <span>Subject is required.</span> : null}
						</div>
						<div className="row2">
							<textarea
								name="message"
								value={message}
								onChange={(event) => setMessage(event.target.value)}
								placeholder="Type Your Message Here"
							/>
							{errors.message ? <span>Message is required.</span> : null}
						</div>
						<div className="row2">
							<input type="submit" value={buttonText} />
						</div>
						{showSuccessMessage ? (
							<p>Sent. A confirmation is on its way to your inbox.</p>
						) : null}
						{showFailureMessage ? <p>{failureText}</p> : null}
					</form>
				</section>

				<div className="copyright">
					<p>Copyright © 2026 Russell Palma. All Rights Reserved.</p>
				</div>
			</div>
		</div>
	);
}
