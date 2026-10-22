import nodemailer from "nodemailer";

export type ContactMessage = {
	fullname: string;
	email: string;
	subject: string;
	message: string;
};

function escapeHtml(value: string): string {
	return value.replace(/[&<>"']/g, (char) => {
		switch (char) {
			case "&":
				return "&amp;";
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case '"':
				return "&quot;";
			default:
				return "&#39;";
		}
	});
}

function layout(title: string, body: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;background:#f4f1ea;color:#1f2933;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e6e0d4;">
          <tr>
            <td style="background:#1f2933;color:#f8f5ef;padding:22px 28px;font-family:Arial,Helvetica,sans-serif;">
              <div style="font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:#d6d3d1;">Russell Palma</div>
              <div style="font-size:20px;margin-top:6px;">${escapeHtml(title)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;font-size:16px;line-height:1.6;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 24px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b7280;">
              Russell Palma · Portland, TN · <a href="https://www.linkedin.com/in/russpalms" style="color:#1f2933;">LinkedIn</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function transport() {
	const user = process.env.SMTP_USER ?? "rpalm@email.parkmyride.site";
	const pass = process.env.SMTP_PASS;
	if (!pass) {
		throw new Error("SMTP is not configured");
	}

	return nodemailer.createTransport({
		host: process.env.SMTP_HOST ?? "email.parkmyride.site",
		port: Number(process.env.SMTP_PORT ?? 587),
		secure: false,
		auth: { user, pass },
		tls: {
			servername: "mail.parkmyride.site",
			rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED === "true",
		},
	});
}

export async function sendContactEmails(input: ContactMessage): Promise<void> {
	const from = process.env.SMTP_USER ?? "rpalm@email.parkmyride.site";
	const notify = process.env.NOTIFY_TO ?? "me@russellpalma.com";
	const mailer = transport();
	const name = escapeHtml(input.fullname);
	const email = escapeHtml(input.email);
	const subject = escapeHtml(input.subject);
	const message = escapeHtml(input.message).replace(/\n/g, "<br />");

	await mailer.sendMail({
		from: `"Russell Palma" <${from}>`,
		to: input.email,
		replyTo: notify,
		subject: "I received your message",
		text: `Hello ${input.fullname},\n\nThank you for writing. I received your note about "${input.subject}" and I will reply to ${input.email}.\n\nRussell Palma\nhttps://www.linkedin.com/in/russpalms\n`,
		html: layout(
			"Message received",
			`<p style="margin-top:0;">Hello ${name},</p>
       <p>Thank you for writing. I received your note about <strong>${subject}</strong> and I will reply to this address.</p>
       <p style="margin-bottom:0;">Russell Palma</p>`,
		),
	});

	await mailer.sendMail({
		from: `"Portfolio" <${from}>`,
		to: notify,
		replyTo: input.email,
		subject: `Portfolio contact: ${input.subject}`,
		text: `New portfolio contact\n\nName: ${input.fullname}\nEmail: ${input.email}\nSubject: ${input.subject}\n\n${input.message}\n`,
		html: layout(
			"New portfolio contact",
			`<p style="margin-top:0;"><strong>${name}</strong> wrote through the portfolio contact form.</p>
       <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;">Email: <a href="mailto:${email}">${email}</a><br />Subject: ${subject}</p>
       <div style="border-left:3px solid #1f2933;padding:8px 14px;background:#f8f5ef;">${message}</div>`,
		),
	});
}
