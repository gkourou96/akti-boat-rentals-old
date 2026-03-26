import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { fullName, email, phone, preferredDate, message } = body as Record<string, string>;

  // --- Validation ---
  if (!fullName?.trim()) {
    return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  }
  if (!email?.trim() || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }
  if (!phone?.trim()) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }
  if (!message?.trim()) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const senderEmail = process.env.HOSTINGER_EMAIL;
  const senderPassword = process.env.HOSTINGER_PASSWORD;

  if (!senderEmail || !senderPassword) {
    console.error("Missing HOSTINGER_EMAIL or HOSTINGER_PASSWORD environment variables.");
    return NextResponse.json(
      { error: "Server configuration error. Please contact us directly." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  const dateLine = preferredDate?.trim()
    ? `<tr><td><strong>Preferred Date:</strong></td><td>${preferredDate.trim()}</td></tr>`
    : "";

  const mailOptions = {
    from: senderEmail,
    to: senderEmail,
    replyTo: email.trim(),
    subject: `New Enquiry from ${fullName.trim()}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:15px;">
        <tr><td><strong>Name:</strong></td><td>${fullName.trim()}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email.trim()}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone.trim()}</td></tr>
        ${dateLine}
        <tr><td style="vertical-align:top"><strong>Message:</strong></td><td style="white-space:pre-wrap">${message.trim()}</td></tr>
      </table>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Nodemailer send error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
