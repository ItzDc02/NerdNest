# NerdNest – IT Knowledge Base CMS

NerdNest lets your support team write, publish and track self‑help articles without wrestling with custom code. It’s a lean React + Firebase app that ships what you need to keep tickets down and users happy.

---

## ✨ What It Can Do

### 📄 Article management

- **Markdown editor with live preview** – powered by React MDE and React Markdown
- **Image uploads** – drag‑and‑drop files straight into the editor; Firebase Storage handles hosting
- **Tags and categories** – keep everything organised for quick filtering
- **Draft / publish toggle** – work in private, go public when ready
- **Instant edits** – changes propagate the moment you hit *Save*

### 📊 Admin dashboard

- Metric cards show published articles, drafts, views and feedback in real time
- Filterable article table with inline status badges and action dropdowns
- Feedback list with direct links back to the source article

### 🔍 Quick search

- Debounced full‑text search across title, content and tags
- Client‑side filters by category, tag or date

### 🛡️ Authentication & roles

- Firebase Email/Password auth out of the box
- **Admins** create, edit, delete and moderate
- **End‑users** read and leave feedback
- Protected routes built with a tiny `useAuth` hook and React Router

### 💬 Feedback loop

- Thumbs‑up / down rating on every article
- Optional comment box for suggestions or corrections
- Admin inbox for triage

### 🎨 Looks good everywhere

- Tailwind CSS with a custom colour palette and typography plugin
- Dark‑mode switch (class based, zero flicker)
- Mobile‑first layout tested from 320 px up
- Lucide icons keep it lightweight and consistent

### ⚙️ For developers

- Vite dev server – hot reload in under a second
- ESLint + Prettier + Tailwind plugins
- Strict file layout so newcomers don’t get lost
- One‑click Vercel deploy (`vercel.json` included)

---

## 🏗 Tech Stack

| Layer       | Libraries / Services                                                  |
| ----------- | --------------------------------------------------------------------- |
| **UI**      | React 18, React Router 6, Tailwind CSS, react‑hot‑toast, lucide‑react |
| **Editor**  | React MDE, React Markdown                                             |
| **Data**    | Firebase Auth, Cloud Firestore, Firebase Storage                      |
| **Tooling** | Vite 7, ESLint 9, Prettier, vite-plugin-svgr                          |

---

## 🚀 Quick start

```bash
# 1. Clone
git clone https://github.com/ItzDc02/NerdNest.git
cd NerdNest

# 2. Install dependencies
npm install

# 3. Configure Firebase
cp .env.example .env   # then paste your own keys
# You’ll need Auth (Email/Password), Firestore and Storage enabled.

# 4. Run in dev
npm run dev            # http://localhost:5173
```

Production build: `npm run build && npm run preview`.

---

## 🌍 Deploy

The repo ships with a `vercel.json`. Push to a GitHub repo, import in Vercel, add your Firebase env vars and you’re good.

---

## 📂 Project tour

```
src/
├── assets/                static files & logo
├── components/
│   ├── Admin/             dashboard, editor, lists, widgets
│   ├── Auth/              login & signup forms
│   ├── Public/            article cards, search bar, feedback form
│   └── Layout.jsx         header, sidebar, shell
├── hooks/                 useAuth, other helpers
├── lib/                   firebase.js
├── pages/                 route‑level components
├── utils/                 slugify, misc helpers
└── main.jsx               entry point
```

---

## 🛣 Roadmap

- Algolia powered fuzzy search
- Version history with diff & restore
- Custom roles (editors, reviewers)
- Detailed analytics dashboard
- End‑to‑end tests with Playwright

---

## 🤝 Contributing

Fork, branch, code, open a PR. Bug reports and feature ideas welcome too.

---

## 📜 License

MIT

---

Questions? Open an issue or write to [**deepamchakraborty3639@gmail.com**](mailto\:deepamchakraborty3639@gmail.com).
