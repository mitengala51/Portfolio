# Miten Gala | Developer Portfolio

A fast, minimal, mobile-first portfolio website for a freelance full-stack web developer. Built with React and Vite on the frontend and a small Express API that powers the contact form.

**Live site:** [your-domain.com](https://your-domain.com) <!-- replace with your deployed URL -->

<!-- Add a screenshot: ![Portfolio preview](./docs/preview.png) -->

---

## Overview

The site presents my background, projects, experience and skills in one clean, scrollable page, plus a detail page for each project and a working contact form.

**Sections:** Hero → About → Projects → Experience → Skills → Contact

## Features

- **Clean, minimal design** with a warm orange accent, a dark theme and no gradients
- **Smooth 2D animations:** word-by-word hero reveal, scroll-triggered reveals, animated mobile menu, scroll progress bar, accordion-style micro-interactions
- **Mobile-first:** 48px touch targets, full-screen mobile menu, sticky contact bar on small screens, 16px form inputs (no iOS zoom)
- **Project pages** at real URLs (`/projects/:slug`) that can be shared and refreshed
- **Working contact form** with server-side validation, a honeypot field and rate limiting
- **Social links** managed from a single data file
- **Accessible:** semantic HTML, skip link, visible focus states, ARIA labels, `prefers-reduced-motion` support
- **SEO basics:** per-page title, description and canonical tags, Open Graph tags and JSON-LD structured data
- **Content-driven:** all text, projects and links live in `frontend/src/data/`, so no component edits are needed to update the site

## Tech Stack

**Frontend**

| Tool | Purpose |
|---|---|
| React 19 | UI |
| Vite | Dev server and build |
| React Router | Routing (lazy-loaded pages) |
| Tailwind CSS v4 | Styling |
| Motion (`motion/react`) | Animations, loaded with `LazyMotion` to keep the bundle small |
| lucide-react, react-icons | Icons |
| react-hot-toast | Form feedback |

**Backend**

| Tool | Purpose |
|---|---|
| Node.js + Express 5 | API server |
| Nodemailer | Sends contact emails via Gmail |
| Helmet | Security headers |
| CORS | Restricts requests to the frontend origin |
| express-rate-limit | Limits contact form abuse |

## Project Structure

```
portfolio/
├── backend/
│   ├── index.js                      # App setup and server start
│   ├── routes/contact.routes.js
│   ├── controllers/contact.controller.js
│   ├── middleware/
│   │   ├── rateLimiter.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── mailer.js
│   │   └── validate.js
│   └── .env.example
└── frontend/
    ├── public/                       # favicon, OG image, project screenshots
    ├── src/
    │   ├── Pages/                    # HomePage, ProjectDetailPage, NotFoundPage
    │   ├── Components/
    │   │   ├── Layout/               # Navbar, Footer, StickyCTA, ScrollProgress
    │   │   ├── Common/               # Header, Reveal, Socials
    │   │   └── Sections/             # Hero, About, Projects, Experience, Skills, Contact
    │   ├── data/                     # profile, projects, experience, skills
    │   ├── hooks/                    # usePageMeta
    │   ├── lib/                      # api.js (fetch wrapper)
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css                 # Tailwind theme and shared component styles
    ├── index.html
    ├── vite.config.js
    ├── vercel.json
    └── .env.example
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- A Gmail account with 2-Step Verification enabled (for the contact form)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` (see [Environment Variables](#environment-variables)), then start the API:

```bash
npm run dev        # http://localhost:5000
```

### 3. Set up the frontend

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev        # http://localhost:5173
```

In development, Vite proxies `/api` requests to `http://localhost:5000`, so no extra configuration is needed.

## Environment Variables

### `backend/.env`

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default `5000`) |
| `CLIENT_URL` | Yes | Allowed frontend origin(s), comma-separated. Example: `http://localhost:5173` |
| `GMAIL_USER` | Yes | Gmail address used to send messages |
| `GMAIL_APP_PASSWORD` | Yes | [Gmail App Password](https://support.google.com/accounts/answer/185833), not your normal password |
| `CONTACT_TO` | No | Where messages are delivered (defaults to `GMAIL_USER`) |

### `frontend/.env`

| Variable | Required | Description |
|---|---|---|
| `VITE_SITE_URL` | Yes | Public site URL, used for canonical and Open Graph tags (no trailing slash) |
| `VITE_API_URL` | Production only | Base URL of the deployed backend, e.g. `https://your-api.onrender.com`. Leave unset in development |

> Never commit `.env` files. Only `.env.example` belongs in the repository.

## Customizing the Content

All content is in `frontend/src/data/`:

| File | What to edit |
|---|---|
| `profile.js` | Name, role, hero description, about text, location, email and **social links** |
| `projects.js` | Project cards and project detail pages |
| `experience.js` | Work and education timeline |
| `skills.js` | Skill groups and tools |

**Social links:** in `profile.js`, fill in the `url` for each entry in `socials`. Entries with an empty `url` are hidden automatically.

**Adding a project:** add an object to the array in `projects.js` with a unique `slug`, title, summary, stack, links and images. Put screenshots in `frontend/public/images/projects/`. The card and the `/projects/<slug>` page appear automatically. Entries marked `draft: true` show only in development.

**Colors:** the palette is defined once in the `@theme` block of `frontend/src/index.css`.

## Contact API

`POST /api/contact`

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Website project",
  "message": "Hi, I'd like to discuss a new website."
}
```

| Status | Meaning | Body |
|---|---|---|
| `200` | Message sent | `{ "message": "Thanks, your message has been sent." }` |
| `400` | Validation failed | `{ "message": "...", "errors": { "email": "..." } }` |
| `429` | Rate limit hit (5 requests per IP per 10 minutes) | `{ "message": "..." }` |
| `500` | Email could not be sent | `{ "message": "..." }` |

Spam protection: a hidden `website` field acts as a honeypot (bots that fill it get a fake success response), single-line fields are stripped of line breaks to prevent header injection, and request bodies are capped at 10 KB.

`GET /api/health` returns `{ "status": "ok" }`, useful for uptime checks.

## Scripts

**Frontend** (`/frontend`)

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

**Backend** (`/backend`)

| Command | Description |
|---|---|
| `npm run dev` | Start the API with auto-restart (`node --watch`) |
| `npm start` | Start the API for production |

## Deployment

**Frontend: Vercel**

1. Import the repository and set the **root directory** to `frontend`.
2. Add environment variables `VITE_SITE_URL` and `VITE_API_URL` (your backend URL).
3. Deploy. `vercel.json` already handles client-side routing and asset caching.

**Backend: Render, Railway or similar**

1. Create a Node web service with the **root directory** set to `backend`.
2. Build command: `npm install`. Start command: `npm start`.
3. Add `CLIENT_URL` (your Vercel domain), `GMAIL_USER`, `GMAIL_APP_PASSWORD` and `CONTACT_TO`.

> Free hosting tiers may put the backend to sleep when idle, so the first contact form submission after a quiet period can be slow. A paid tier or an uptime ping to `/api/health` avoids this.

## Performance and Accessibility Notes

- Routes are lazy-loaded, and animations use `LazyMotion` to keep the initial bundle small
- Animations use only `transform` and `opacity`, and the marquee-style effects are pure CSS
- Images use explicit dimensions, `loading="lazy"` and `decoding="async"` to avoid layout shift
- Fonts are self-hosted through Fontsource, with no third-party font requests
- Hover effects apply only on devices that support hover
- All animations are disabled or reduced for users who prefer reduced motion

## License

This project is open source under the [MIT License](LICENSE). <!-- add a LICENSE file, or change this line -->

## Contact

**Mit Engala**: [mitengala51@gmail.com](mailto:mitengala51@gmail.com) · [GitHub](https://github.com/mitengala51)
