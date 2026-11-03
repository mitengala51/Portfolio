import { useState } from "react";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";
import Header from "../Common/Header";
import Reveal from "../Common/Reveal";
import { sendContactMessage } from "../../lib/api";
import { profile } from "../../data/profile";
import Socials from "../Common/Socials";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

const fields = [
  {
    name: "name",
    label: "Your name",
    type: "text",
    required: true,
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    autoComplete: "email",
  },
  {
    name: "subject",
    label: "Subject (optional)",
    type: "text",
    required: false,
  },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setErrors({});

    try {
      const data = await sendContactMessage(form);
      toast.success(data.message);
      setForm(initialForm);
    } catch (error) {
      setErrors(error.fieldErrors || {});
      toast.error(error.message);
    } finally {
      setSending(false);
    }
  }

  // Shared accessibility props for every input
  const inputProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    className: "field",
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="container-page py-24"
    >
      <Header
        eyebrow="Let's work together"
        title="Contact"
        id="contact-title"
      />

      <div className="grid gap-10 md:grid-cols-2">
        <Reveal className="space-y-5">
          <p className="text-lg text-muted">
            Have a project in mind? Send me a message and I'll get back to you
            within a day or two.
          </p>

          {/* <ul className="space-y-3">
              <li>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 hover:text-accent-2">
                  <Mail className="h-5 w-5" aria-hidden="true" /> {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:text-accent-2">
                  <Github className="h-5 w-5" aria-hidden="true" /> GitHub
                </a>
              </li>
              {profile.linkedin && (
                <li>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:text-accent-2">
                    <Linkedin className="h-5 w-5" aria-hidden="true" /> LinkedIn
                  </a>
                </li>
              )}
            </ul> */}

          {/* <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-3 text-lg hover:text-accent"
          >
            <Mail className="h-5 w-5" aria-hidden="true" /> {profile.email}
          </a>
          <Socials showLabels /> */}
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass space-y-4 rounded-2xl p-6"
          >
            {/* Honeypot: hidden from users and screen readers, bots fill it */}
            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={handleChange}
                />
              </label>
            </div>

            {fields.map(({ name, label, type, required, autoComplete }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="mb-1 block text-sm font-medium"
                >
                  {label}
                </label>
                <input
                  type={type}
                  required={required}
                  autoComplete={autoComplete}
                  {...inputProps(name)}
                />
                {errors[name] && (
                  <p
                    id={`${name}-error`}
                    role="alert"
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-sm font-medium"
              >
                Message
              </label>
              <textarea rows={5} required {...inputProps("message")} />
              {errors.message && (
                <p
                  id="message-error"
                  role="alert"
                  className="mt-1 text-sm text-red-400"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="btn btn-primary w-full disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
