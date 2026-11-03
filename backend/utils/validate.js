const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const oneLine = (value, max) => String(value ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

export function validateContact(body) {
  const data = {
    name: oneLine(body?.name, 80),
    email: oneLine(body?.email, 120),
    subject: oneLine(body?.subject, 120),
    message: String(body?.message ?? "").trim().slice(0, 4000),
  };

  const errors = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Please write a few more words.";

  return { ok: Object.keys(errors).length === 0, errors, data };
}