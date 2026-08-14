# CardCraft

> A pastel-themed, AI-assisted digital greeting card creation platform.

Built with **Angular 22+** (Standalone Components, Signals), **Tailwind CSS** (10-step pastel green design system), and **Supabase** (PostgreSQL + Auth + Storage).

---

## Repository Structure

```
bloomnote/
├── .gemini/                  # AI agent config, personas, templates
│   ├── GEMINI.md             # Angular coding standards & best practices
│   ├── personas/             # Specialist agent personas (Guardian, Architect, UX, Dev)
│   └── templates/            # Reusable doc templates (PRD, Project Brief, Session Log)
│
├── docs/                     # Lifecycle-based project documentation
│   ├── 10_DISCOVERY/         # Early-stage research, briefs, ideation notes
│   ├── 20_ACTIVE_SPECS/      # Live working documents (PRD, Project Plan)
│   ├── 30_ARCHITECTURE/      # Technical specs and current implementation plans
│   └── 99_SUPERSEDED/        # Outdated or replaced documents (archived, not deleted)
│
├── prototype/                # Single-file HTML prototype (React + Tailwind SPA)
│   └── pastel_card_maker_project_suite.html
│
├── src/                      # Angular application source code
│   ├── app/
│   │   ├── components/       # Feature UI components
│   │   │   ├── ai-assistant/ # Grammarly-style AI sidekick drawer
│   │   │   ├── collections/  # My Cards Collections gallery
│   │   │   ├── editor/       # Interactive Card Studio editor
│   │   │   ├── header/       # Top navigation header with profile menu
│   │   │   ├── sidebar/      # Collapsible left sidebar navigation
│   │   │   └── wizard/       # 3-step card creation wizard
│   │   ├── constants/        # Static data (card categories, fonts, themes, stickers)
│   │   ├── models/           # TypeScript interfaces and type definitions
│   │   └── services/         # Singleton services (CardStateService)
│   ├── styles.css            # Global Tailwind CSS + pastel design tokens
│   └── index.html            # App entry HTML shell
│
├── public/                   # Static public assets (favicon, images)
├── angular.json              # Angular CLI workspace configuration
├── package.json              # npm dependencies
└── tsconfig.json             # TypeScript compiler configuration
```

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
ng serve
# → http://localhost:4200

# Run unit tests
ng test

# Build for production
ng build
```

## Key Technology Decisions

| Layer | Technology |
|---|---|
| Frontend | Angular 22+ (Standalone, Signals) |
| Styling | Tailwind CSS + 10-step Pastel Green Tokens |
| Typography | 6 Google Fonts (Playfair, Dancing, Caveat, Pacifico, Montserrat, Poppins) |
| State | Angular Signals + CardStateService |
| Backend | Supabase (PostgreSQL + Auth + RLS + Storage) |
| AI | OpenAI GPT-4o-mini (Fix Grammar, Shorten, Elongate, Make Heartfelt, Make Funny, Make Formal) |
| Deployment | Vercel + Supabase Cloud |

## Personas

Agent personas are stored in [.gemini/personas/](.gemini/personas/) and are invoked during development sessions:

- **guardian.md** — Repository structure enforcement & file audit
- **solution_architect.md** — System design, SLAs & technical architecture
- **ui-ux-designer.md** — Design review, accessibility & UX recommendations
- **web_developer.md** — Angular implementation & coding best practices
