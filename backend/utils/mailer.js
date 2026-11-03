import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("Mail credentials are not configured");
  }
  // Created once and reused, instead of per request
  transporter ??= nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });
  return transporter;
}

export async function sendContactMail({ name, email, subject, message }) {
  await getTransporter().sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_TO || process.env.GMAIL_USER,
    replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
    subject: `Portfolio enquiry: ${subject || "New message"}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });
}