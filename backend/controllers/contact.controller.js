import { validateContact } from "../utils/validate.js";
import { sendContactMail } from "../utils/mailer.js";

const SUCCESS = { message: "Thanks, your message has been sent." };

export async function submitContact(req, res) {
  const body = req.body ?? {};

  // Honeypot: real visitors never fill this hidden field. Pretend success to bots.
  if (body.website) return res.status(200).json(SUCCESS);

  const { ok, errors, data } = validateContact(body);
  if (!ok) return res.status(400).json({ message: "Please check the form.", errors });

  await sendContactMail(data); // errors fall through to errorHandler (Express 5 handles async throws)
  res.status(200).json(SUCCESS);
}