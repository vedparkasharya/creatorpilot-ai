<div align="center">

# 🎬 CreatorPilot AI

### AI-Powered Media Assistant for Creators using Cloudinary

**Built for the [Cloudinary Creators Community June Mini-Hackathon](https://creators-community-mini-hackathon.devpost.com/)**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-creator--pilot--ai.vercel.app-5B21B6?style=for-the-badge&logo=vercel&logoColor=white)](https://creator-pilot-ai.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Cloudinary](https://img.shields.io/badge/Cloudinary- Skills%20Pack-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Cloudinary Skills Pack Integration](#-cloudinary-skills-pack-integration)
- [Screenshots](#-screenshots)
- [Hackathon Submission Details](#-hackathon-submission-details)
- [Team](#-team)
- [License](#-license)

---

## 🎯 Overview

**CreatorPilot AI** is an all-in-one AI-powered media assistant designed specifically for content creators, developers, and media professionals. It provides a unified dashboard to interact with Cloudinary's powerful media management capabilities through an intuitive, modern interface.

The application leverages the **Cloudinary Skills Pack** to provide intelligent features like natural language documentation queries, visual transformation builders, React SDK code generation, media asset management, and AI-powered content creation — all in one place.

🔗 **Live Demo**: [creator-pilot-ai.vercel.app](https://creator-pilot-ai.vercel.app)

---

## ✨ Features

### 🏠 1. Interactive Dashboard
- Clean, modern dark-themed UI with sidebar navigation
- Quick-access feature cards with gradient icons
- Real-time statistics and activity monitoring
- Smooth animations and responsive design

### 📚 2. AI Docs Assistant
- Ask Cloudinary documentation anything using **natural language**
- Get instant, accurate answers with **code examples**
- Powered by the `cloudinary-docs` skill
- Perfect for developers who need quick API references

### 🎨 3. Transformation Studio
- Build complex Cloudinary transformations **visually**
- Generate valid transformation URLs from **natural language descriptions**
- Live preview of transformation effects
- Powered by the `cloudinary-transformations` skill

### 💻 4. React SDK Playground
- Live code editor with **Cloudinary React SDK** patterns
- Copy-paste ready code snippets
- Powered by the `cloudinary-react` skill integration
- Perfect for React developers integrating Cloudinary

### 🖼️ 5. Media Manager
- **Upload, organize, and manage** Cloudinary media assets
- Beautiful visual grid interface
- Search, filter, and categorize assets
- Direct integration with Cloudinary's Media Library

### 🤖 6. AI Generator
- **AI-powered media generation** using Cloudinary's generative capabilities
- Create images, videos, and variations with AI prompts
- Transform existing media with generative AI features

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2 | UI Framework |
| TypeScript | 5.7 | Type Safety |
| Vite | 7.2 | Build Tool & Dev Server |
| Tailwind CSS | 3.4 | Utility-first CSS |
| shadcn/ui | latest | UI Component Library (40+ components) |
| Cloudinary React SDK | 1.14 | Media Management |
| Cloudinary URL Gen | 1.22 | URL Generation |
| Lucide React | 0.562 | Icon Library |
| Recharts | 2.15 | Data Visualization |

---

## 📁 Project Structure

```
creatorpilot-ai/
├── public/                  # Static assets
├── src/
│   ├── cloudinary/          # Cloudinary SDK configuration
│   │   └── config.ts        # Cloudinary instance setup
│   ├── components/
│   │   ├── custom/          # Custom app components
│   │   │   ├── Header.tsx   # Top navigation bar
│   │   │   └── Sidebar.tsx  # Side navigation panel
│   │   └── ui/              # shadcn/ui components (40+)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Main application pages
│   │   ├── Home.tsx         # Dashboard landing page
│   │   ├── DocsAssistant.tsx    # AI Docs Assistant
│   │   ├── TransformationStudio.tsx  # Transformation Studio
│   │   ├── ReactPlayground.tsx   # React SDK Playground
│   │   ├── MediaManager.tsx     # Media Manager
│   │   └── AIGenerator.tsx      # AI Generator
│   ├── App.tsx              # Root component with routing
│   ├── App.css              # App-specific styles
│   ├── index.css            # Global styles & Tailwind
│   └── main.tsx             # Entry point
├── index.html               # HTML entry point
├── package.json             # Dependencies & scripts
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
├── vercel.json              # Vercel deployment config
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 20.0.0
- **npm** >= 10.0.0

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vedparkasharya/creatorpilot-ai.git

# 2. Navigate to project directory
cd creatorpilot-ai

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Open your browser
# The app will be running at http://localhost:5173
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Development | `npm run dev` | Start Vite dev server with HMR |
| Build | `npm run build` | Production build with TypeScript compilation |
| Preview | `npm run preview` | Preview the production build locally |
| Lint | `npm run lint` | Run ESLint for code quality |

---

## 🔗 Cloudinary Skills Pack Integration

CreatorPilot AI integrates the following **Cloudinary Skills Pack** capabilities:

| Skill | Page | Description |
|-------|------|-------------|
| `cloudinary-docs` | AI Docs Assistant | Natural language queries to Cloudinary documentation |
| `cloudinary-transformations` | Transformation Studio | Visual transformation URL builder |
| `cloudinary-react` | React SDK Playground | React SDK code generation |
| Cloudinary Upload API | Media Manager | Media upload and asset management |
| Cloudinary Gen AI | AI Generator | AI-powered content generation |

---

## 📸 Screenshots

> Screenshots will be added here. Visit the [live demo](https://creator-pilot-ai.vercel.app) to see the app in action!

### Dashboard
- Dark-themed modern dashboard
- Feature cards with gradient accents
- Real-time statistics panel

### Feature Pages
- AI Docs Assistant with chat interface
- Transformation Studio with visual builder
- React SDK Playground with code editor
- Media Manager with asset grid
- AI Generator with prompt interface

---

## 🏆 Hackathon Submission Details

**Event**: [Cloudinary Creators Community June Mini-Hackathon](https://creators-community-mini-hackathon.devpost.com/)

**Theme**: Build something amazing using the Cloudinary Skills Pack

**What We Built**:
An all-in-one AI-powered media assistant that brings together multiple Cloudinary capabilities into a single, cohesive developer experience. CreatorPilot AI eliminates the need to jump between different tools and documentation — everything a creator needs is in one place.

**Key Highlights**:
- ✅ Built with **React 19 + TypeScript + Vite + Tailwind CSS**
- ✅ **40+ shadcn/ui components** for consistent, accessible UI
- ✅ **6 powerful features** powered by Cloudinary Skills Pack
- ✅ **Fully responsive** dark-themed design
- ✅ **Deployed on Vercel** with CI/CD
- ✅ Clean, modular architecture with **TypeScript types**

**Cloudinary Features Used**:
- 🟣 Cloudinary React SDK (`@cloudinary/react`)
- 🟣 Cloudinary URL Generation (`@cloudinary/url-gen`)
- 🟣 Cloudinary Docs Skill (AI-powered documentation)
- 🟣 Cloudinary Transformations Skill (visual builder)
- 🟣 Cloudinary React Skill (code generation)
- 🟣 Cloudinary Upload API (media management)
- 🟣 Cloudinary Generative AI (content creation)

---

## 👥 Team

**Developer**: [Ved Parkash Arya](https://github.com/vedparkasharya)

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### 🙏 Acknowledgments

- [Cloudinary](https://cloudinary.com) for the amazing Skills Pack and APIs
- [Cloudinary Creators Community](https://creators-community-mini-hackathon.devpost.com/) for organizing the hackathon
- [shadcn/ui](https://ui.shadcn.com) for the beautiful component library
- [Vercel](https://vercel.com) for seamless deployment

**⭐ Star this repo if you found it helpful!**

</div>
