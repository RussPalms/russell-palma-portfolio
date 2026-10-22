import { NextResponse } from "next/server";
import { sendContactEmails } from "@/lib/mail";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}

	if (!body || typeof body !== "object") {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}

	const record = body as Record<string, unknown>;
	const fullname = String(record.fullname ?? "").trim();
	const email = String(record.email ?? "").trim();
	const subject = String(record.subject ?? "").trim();
	const message = String(record.message ?? "").trim();

	if (
		fullname.length < 2 ||
		fullname.length > 120 ||
		!EMAIL_PATTERN.test(email) ||
		email.length > 200 ||
		subject.length < 2 ||
		subject.length > 160 ||
		message.length < 2 ||
		message.length > 5000
	) {
		return NextResponse.json(
			{ error: "Please check the name, email, subject, and message." },
			{ status: 400 },
		);
	}

	try {
		await sendContactEmails({ fullname, email, subject, message });
	} catch (error) {
		console.error("contact mail failed", error instanceof Error ? error.message : "unknown");
		return NextResponse.json(
			{ error: "The message could not be sent. Please email me@russellpalma.com directly." },
			{ status: 500 },
		);
	}

	return NextResponse.json({ ok: true });
}
