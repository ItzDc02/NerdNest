# NerdNest, An IT Knowledge Base CMS (Self-Service Portal)

A modern, responsive, and easy-to-use portal for IT teams to publish helpful articles, answer frequently asked questions, and empower users to solve common problems on their own.  
Built with React, Vite, Firebase, and Tailwind CSS for performance and scalability.

---

## ✨ Features

### 🚩 Article Management

- **Rich-text editor:** Easily create, format, and update articles with headings, images, links, and more—no coding required.
- **Categorization & tagging:** Organize content by topic or department for easy navigation and filtering.
- **Draft & publish states:** Save work-in-progress as drafts and only publish when ready.
- **Revision-friendly:** Edit articles at any time—changes are reflected instantly for all users.

### 🔎 Fast, Intuitive Search

- **Instant search:** Users can search by title, keyword, or category with results updating in real-time.
- **Filter & sort:** Quickly narrow down results by tag, category, or date.
- **Smart suggestions:** See recommended articles as you type.

### 👥 Authentication & Roles

- **Secure login:** Built-in Firebase authentication (email/password).
- **Role-based access:**  
  - **Admins:** Full access to create, edit, delete, and manage articles & feedback.  
  - **End-users:** Read-only access to the knowledge base and feedback features.

### 📝 Feedback Collection

- **Per-article feedback:** Users can rate articles (thumbs up/down) to indicate helpfulness.
- **Comment form:** Collect suggestions, corrections, or questions—feedback is stored in Firestore and visible to admins for action.
- **Analytics-ready:** Simple stats on which articles are most/least helpful.

### 🎨 Clean, Responsive Design

- **Mobile-first layout:** Looks great on all devices, from phones to desktop monitors.
- **Light & dark mode:** Seamless theme toggle for better accessibility.
- **Minimal & modern UI:** Easy navigation, distraction-free reading, and clear visual hierarchy.
- **Lucide icons:** Crisp, open-source icons for a professional feel.

### ⚡ Built for Developers

- **Fast dev server:** Instant reloads and builds with Vite.
- **Strict code quality:** ESLint and Prettier for clean, readable code.
- **Environment variables:** Keep your config and secrets safe in `.env`.
- **Well-structured components:** Easy to extend or adapt for your team.

---

## 🏗 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS  
- **Backend (BaaS):** Firebase Auth & Firestore  
- **Icons:** lucide-react  
- **Linting/Formatting:** ESLint, Prettier

---

## 🚀 Getting Started

1. **Clone & install**

   ```bash
   git clone https://github.com/<your-handle>/it-knowledge-base.git
   cd it-knowledge-base
   npm install
   ```

2. **Set up Firebase**

   - Create a Firebase project ([firebase.google.com](https://firebase.google.com/))
   - Enable **Authentication** (Email/Password)
   - Create a **Cloud Firestore** database
   - Copy your config keys into a `.env` file:

     ```
     VITE_FIREBASE_API_KEY=xxx
     VITE_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=xxx
     VITE_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
     VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
     VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXX
     ```

3. **Run in development**

   ```bash
   npm run dev
   # Open http://localhost:5173 in your browser
   ```

4. **Build for production**

   ```bash
   npm run build
   npm run preview
   ```

---

## 🗂 Project Structure

```
src/
├── components/         # Reusable UI & logic modules
│   ├── Admin/          # Admin dashboard, ArticleForm, ArticleList, FeedbackList
│   ├── Auth/           # LoginForm, SignupForm, AuthContext
│   └── Public/         # ArticleCard, FeedbackForm, SearchBar
├── lib/
│   └── firebase.js     # Firebase initialization & helpers
├── App.jsx             # App shell & routes
└── main.jsx            # Entry point
```

---

## 🛠 Possible Extensions

- 🔍 **Algolia search integration** for blazing-fast, typo-tolerant search
- 📝 **Article version history** and restore
- 🗂 **Bulk import/export** (Markdown, CSV, or JSON)
- 🛡️ **Custom user permissions** (editors, reviewers)
- 📊 **Detailed analytics** dashboard
- ✅ **Unit & integration tests** (Vitest + React Testing Library)

---

## 🤝 Contributing

Pull requests, bug reports, and feature suggestions are welcome!  
Open an issue to discuss your idea or get help.

---

## 📄 License

MIT — Free to use, modify, and distribute.

---

**Questions?**  
File an issue or reach out to [deepamchakraborty3639@gmail.com](mailto:deepamchakraborty3639@gmail.com).
