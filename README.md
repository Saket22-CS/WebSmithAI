# 🧠 WebSmithAI – Full-Stack AI SaaS Website Generator 🚀  
**Live Demo:** [https://web-smith-ai.vercel.app/](https://web-smith-ai.vercel.app/)  

> **WebSmithAI** is a next-generation **AI-powered SaaS web application** that allows users to **generate, edit, and customize complete websites with a single click** — all in real time.  
> Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Clerk**, **ImageKit**, **Drizzle ORM**, and **Neon PostgreSQL**, it merges AI creativity with human precision.  

---

## 🏗️ Key Features & Highlights  

### ⚙️ AI-Powered Website Generation  
- Generate full, production-ready websites instantly from a text prompt.  
- Uses **OpenRouter’s streaming AI API** for **real-time code generation**.  
- Generates responsive **HTML/CSS/Tailwind code** on the fly.  

### ✏️ Inline Editing Without Regeneration  
- Unique inline editing feature enables users to **modify elements (text, font, color, margin, padding, etc.) directly** within the preview.  
- Updates are saved instantly to the database — no need to re-trigger the AI model.  

### 🧩 AI Image Generation & Transformation  
- Powered by **ImageKit** for:  
  - Smart cropping  
  - Background removal  
  - Drop shadows  
  - Upscaling  
  - AI-generated images from text prompts  
- Transformations are applied instantly using **URL-based AI parameters**.  

### 🖥️ Responsive Design Preview  
- Toggle between **desktop** and **mobile** modes for adaptive layouts.  
- Built-in **iframe-based rendering** isolates design styles for accurate previews.  

### 🔐 Authentication & Billing (SaaS Model)  
- **Clerk** handles secure sign-up, sign-in, and multi-factor authentication.  
- Integrated **subscription billing** and **credit-based usage model**.  
- Free-tier users get limited project credits; upgrade for **unlimited creation**.  

### 📦 Project & Workspace Management  
- Personalized workspace dashboard with:  
  - Project list  
  - Remaining credits tracker  
  - Profile dropdown  
  - “Add New Project” button  
- Each project stores multiple “frames” (design versions) and associated chat logs.  

### 🗃️ Backend & Database  
- **Neon PostgreSQL** cloud database with **Drizzle ORM** for schema management.  
- Stores:  
  - User data  
  - Projects  
  - Frames (website versions)  
  - AI conversation history  

### 💾 Code & Data Persistence  
- All user edits, AI-generated HTML, and transformations are **persistently stored**.  
- Cleaned HTML code is saved and retrievable for preview or download.  

### 🌩️ Deployment  
- Fully deployed on **Vercel** with **GitHub integration** for CI/CD.  
- Environment variables configured securely through Vercel’s dashboard.  

---

## 🧰 Tech Stack  

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js 14, React, TypeScript, Tailwind CSS, ShadCN UI |
| **Backend** | Next.js API Routes, Drizzle ORM, Neon PostgreSQL |
| **Authentication & Billing** | Clerk |
| **AI Integration** | OpenRouter API |
| **Image Processing** | ImageKit AI Transformations |
| **Deployment** | Vercel |
| **Utilities** | UUID, Axios, React Context API, Toast Notifications |

---

## 🧩 Architecture Overview  

**WebSmithAI** follows a **modular full-stack architecture**, combining React’s client interactivity with serverless APIs for scalability.  

```

User → Clerk Auth → Workspace → Project → Frame → Chat → AI Model → HTML Code → Inline Editor → Database → Save/Preview/Deploy

````

- **Frontend:** React + Tailwind + TypeScript for UI/UX.  
- **Serverless APIs:** Handle chat, project CRUD, and AI integration.  
- **Database (Drizzle ORM + Neon):** Stores structured relational data.  
- **AI Layer:** Streams responses from OpenRouter for live content/code generation.  
- **Storage:** ImageKit handles media storage and transformation.

---

## 🧑‍💻 Application Flow  

1. **User Login/Signup** via Clerk.  
2. **Create Project** → Generates a unique Project ID.  
3. **Send Prompt** → AI generates HTML/Tailwind code.  
4. **Preview Website** in iframe.  
5. **Edit Inline** → Modify text, styles, spacing, etc.  
6. **Save** → Updated HTML is persisted to database.  
7. **Upload/Generate Images** → Modify visuals with ImageKit.  
8. **View Projects** in Workspace.  
9. **Upgrade Plan** for extended usage and features.  

---

## 🧠 Core Functionalities by Module  

### 🔹 **Landing Page**
- Hero section with input for website ideas.
- AI prompt suggestions and interactive UI.

### 🔹 **Authentication**
- Clerk-powered sign-in, sign-up, and session handling.
- Custom modals for login prompts on restricted routes.

### 🔹 **Workspace**
- Sidebar with projects and credit tracker.
- Project listing with skeleton loaders and progress bar.

### 🔹 **Playground (Editor)**
- Split-view layout: Chat → Preview → Settings.
- Real-time AI responses stream directly into design preview.
- Inline editing for direct manipulation of elements.
- Save button triggers HTML extraction and cleanup.

### 🔹 **Database**
- PostgreSQL (via Neon) structured as:
  - `users` – user info  
  - `projects` – each AI-generated website  
  - `frames` – website versions  
  - `messages` – chat history  

### 🔹 **Subscription & Billing**
- Clerk’s subscription system for SaaS plan management.
- Restricts advanced features for free users.
- Real-time plan sync via Clerk Webhooks.

---

## 💬 AI Prompt Example  

```text
"Create a modern landing page for a personal portfolio website with a hero section, project showcase, and contact form."
````

AI Response: Streams Tailwind-styled responsive code instantly, viewable and editable inline.

---

<!-- ## 📸 Screenshots

| Page                  | Description                        |
| --------------------- | ---------------------------------- |
| 🏠 Home Page          | Landing page with AI input and CTA |
| 🔐 Sign-in Page       | Clerk authentication interface     |
| 🗓️ Upcoming Page     | Scheduled project list             |
| 🕒 Previous Page      | History of generated sites         |
| 📼 Recording Page     | Saved design previews and code     |
| 👥 Personal Room Page | Collaborative workspace            |


--- -->

## 📚 Learning & References

* [Next.js Docs](https://nextjs.org/docs)
* [Tailwind CSS](https://tailwindcss.com/)
* [Clerk Authentication](https://clerk.dev/)
* [ImageKit AI](https://imagekit.io/)
* [Drizzle ORM](https://orm.drizzle.team/)
* [Neon PostgreSQL](https://neon.tech/)
* [OpenRouter AI](https://openrouter.ai/)
* [ShadCN UI](https://ui.shadcn.com/)

---

## 💡 Key Insights

* **Inline editing** separates WebSmithAI from other AI website generators.
* **Streaming AI integration** ensures faster feedback than traditional APIs.
* **Cloud-native architecture** ensures scalability and smooth deployment.
* **Clerk + Neon + Vercel** combination makes it production-ready out of the box.

---

## 🧾 Keywords

`AI SaaS` • `Website Generator` • `Inline Editing` • `Next.js` • `Tailwind CSS` • `TypeScript` • `Clerk` • `ImageKit` • `PostgreSQL` • `Drizzle ORM` • `OpenRouter` • `Streaming API` • `WebRTC` • `Responsive Design` • `Vercel Deployment`

---

## 👨‍💻 Author

**Developed by:** [Saket Chaudhary](https://www.linkedin.com/in/saket-chaudhary22/)

**Live Demo:** [https://web-smith-ai.vercel.app/](https://web-smith-ai.vercel.app/)

**GitHub Repo:** [https://github.com/Saket22-CS/WebSmithAI](https://github.com/Saket22-CS/WebSmithAI)

> “Transforming AI intelligence into creative, editable web experiences.”

---

## 📄 License

This project is licensed under the **MIT License** – you’re free to use, modify, and distribute with attribution.

---

## ⭐ Support

If you like this project, please ⭐ the repository and share it!
Feedback and suggestions are always welcome.

---
