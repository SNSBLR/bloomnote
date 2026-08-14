# **CardCraft — Implementation Project Plan**

## **1. Project Overview & Objectives**

**CardCraft** is a digital greeting card platform featuring a 3-step creation wizard (Occasion → Format → Theme), an interactive Angular card studio editor with inline Tailwind CSS, an integrated Grammarly-style AI writing assistant, draft persistence with toast notifications, PDF/PNG export capabilities, embedded interactive project documentation viewers, and a signature pastel green user interface with light/dark mode support.

### **Key Success Metrics**

* **Development Timeline**: 8 Weeks (5 execution phases)  
* **Studio Performance**: 60 FPS interactive rendering & state updates  
* **AI Latency**: < 1 second response time for text transformations  
* **Accessibility**: WCAG 2.1 AA Compliance with 4.5:1 contrast ratio  
* **Export Quality**: Clean PDF and PNG export rendering via browser print engine

## **2. Technical Stack & Infrastructure Summary**

| Area | Technology Selected | Rationale |
| :---- | :---- | :---- |
| **Frontend Framework** | Angular 18+ | Client-side rendering for Card Studio workspace and landing pages. |
| **Styling & Design System** | Tailwind CSS & Framer Motion | Rapid custom styling with 10-step pastel green tokens (`pastel-50` to `pastel-900`) + `sage`, `mint`, `blush`, `lavender`, `cream` & smooth transitions. |
| **Typography Palette** | 6 Google Fonts API | Playfair (Serif), Dancing (Cursive), Caveat (Hand), Pacifico (Fun), Montserrat (Clean), Poppins (Modern). |
| **Card Studio Engine** | Angular Signals + Inline Tailwind CSS | Synchronized live Angular state model matching the HTML prototype architecture for card layout, font, color, stickers, and photos. |
| **Backend & Database** | Firebase (Firestore + Security Rules + Auth + Storage) | Native Google OAuth 2.0 & Email Auth, Firestore for draft cards JSON state, Storage for photo assets. |
| **AI LLM Integration** | OpenAI API (`gpt-4o-mini`) | Firebase Cloud Functions for AI assistant actions (*Fix Grammar*, *Shorten*, *Elongate*, *Make Heartfelt*, *Make Funny*, *Make Formal*). |
| **Deployment & Hosting** | Firebase Hosting | Continuous Integration / Continuous Deployment (CI/CD) with Firebase. |

## **3. Master Project Timeline & Roadmap**

Week 1 - 2: Phase 1 [Foundation, Auth, Design System & In-App Docs]  
Week 3 - 4: Phase 2 [3-Step Wizard Flow & Theme Engine]  
Week 5 - 6: Phase 3 [Interactive Card Studio & Media Tools]  
Week 7    : Phase 4 [Grammarly-Style AI Assistant & Persistence / Exports]  
Week 8    : Phase 5 [Collections Dashboard, QA, E2E Testing & Launch]

## **4. Phase-by-Phase Execution Plan**

### **Phase 1: Foundation, Authentication & Layout Architecture (Weeks 1–2)**

**Goal**: Set up monorepo repository, global 10-step pastel green design system (`pastel-50` to `pastel-900` + `sage`, `mint`, `blush`, `lavender`), light/dark mode theme context, Google OAuth authentication, collapsible sidebar navigation, toast notification system, and embedded project documentation viewers.

* **Tasks**:  
  * [ ] **Task 1.1**: Initialize Angular project repository with Tailwind CSS, TypeScript, and ESLint/Prettier.  
  * [ ] **Task 1.2**: Define Tailwind design tokens for 10-step pastel green hierarchy (`pastel-50`: `#f2f8f4` to `pastel-900`: `#233f2c`), accents (`sage`, `mint`, `cream`, `blush`, `lavender`), and dark mode (`#1B2E23`, `#2D4736`).  
  * [ ] **Task 1.3**: Implement Theme Service for instant light/dark mode switching with localStorage persistence and non-blocking toast notification system.  
  * [ ] **Task 1.4**: Configure Firebase Auth supporting Google OAuth 2.0 and Email/Password flows, and build the dedicated Login/Sign-In Page view matching the prototype as the entry point for unauthenticated users.  
  * [ ] **Task 1.5**: Build responsive top header containing user profile avatar, name, email, Google OAuth badge, and account dropdown menu.  
  * [ ] **Task 1.6**: Build collapsible left sidebar navigation ("Create / New", "My Cards Collections") with arrow toggle button for expanded/icon-only states and theme switcher at the bottom.  
  * [ ] **Task 1.7**: Implement in-app Project Docs section providing interactive viewers and PDF exports for PRD, Master Project Plan, and Current Plan.  
* **Deliverable**: Functional layout shell with authentication, working theme switcher, collapsible sidebar, route guards, toast notifications, and embedded docs viewer.

### **Phase 2: Card Creation Wizard Flow (Weeks 3–4)**

**Goal**: Develop the 3-step guided wizard for Occasions, Layout Formats, and Visual Themes.

* **Tasks**:  
  * [ ] **Task 2.1**: **Step 1 Page** — Build Occasion Selection grid with 6 categories: Gratitude (🙏), Apology (🕊️), Invitation (💌), Birthday (🎂), Get Well Soon (🌸), and Special Occasions (🎉).  
  * [ ] **Task 2.2**: **Step 2 Page** — Build Format Selection view displaying layout formats synchronized with prototype: Folding Vertical, Portrait Single, Landscape Panoramic, and Square Social.  
  * [ ] **Task 2.3**: **Step 3 Page** — Build Theme Selection view displaying 6 curated visual preview cards synchronized with prototype: Soft Botanical, Pastel Floral, Warm Sunset, Celestial Gold, Mint Geometric, and Cozy Watercolor.  
  * [ ] **Task 2.4**: Implement wizard step state management (Angular Services/Signals) with step-back and step-forward validation rules.  
  * [ ] **Task 2.5**: Set up template schema definitions mapping (Occasion + Format + Theme) to Card Studio initialization states.  
* **Deliverable**: Seamless 3-step wizard flow transitioning the user smoothly from category selection to Card Studio initialization.

### **Phase 3: Interactive Card Editor Studio (Weeks 5–6)**

**Goal**: Implement the Angular interactive card studio editor with inline Tailwind CSS, 6 Google Fonts, custom stickers with affordance tooltips, and photo attachment tools.

* **Tasks**:  
  * [ ] **Task 3.1**: Build Card Studio interactive canvas workspace using Angular Signals and inline Tailwind CSS matching prototype layout.  
  * [ ] **Task 3.2**: Build Typography & Color toolbar: inline title/message text editing, 6 Google Fonts (Playfair, Dancing, Caveat, Pacifico, Montserrat, Poppins), font size styles, and dual text/background color pickers.  
  * [ ] **Task 3.3**: Create Sticker Drawer featuring 12 categorized pastel stickers (🌿, ✨, 🌸, 🕊️, 💌, 💖, 🎈, 🎉, 🍵, 🎀, ⭐, 🦋) with hover tooltips (`title="Click to add/remove sticker"`) and active selection badges.  
  * [ ] **Task 3.4**: Implement Photo Upload tool supporting sample photo attachments and custom user image imports.  
  * [ ] **Task 3.5**: Optimize studio state updates to ensure solid 60 FPS performance during live editing.  
* **Deliverable**: Fully functional interactive card editor allowing text manipulation, 6 Google Fonts, sticker overlays with tooltips, color picking, and sample photo attachment.

### **Phase 4: Grammarly-Style AI Assistant & Persistence/Export (Week 7)**

**Goal**: Embed the sidekick AI writing assistant alongside the studio editor, enable JSON draft saving to Firebase Firestore with toast confirmation, and configure PDF/PNG export triggers.

* **Tasks**:  
  * [ ] **Task 4.1**: Create Firebase Cloud Function endpoint (`/api/ai/transform`) connecting to OpenAI GPT-4o-mini for card text transformations.  
  * [ ] **Task 4.2**: Build floating/slide-out AI Assistant drawer docked adjacent to card text fields.  
  * [ ] **Task 4.3**: Integrate PRD-aligned action prompt triggers: *"Fix Grammar"*, *"Shorten"*, *"Elongate"*, *"Make Heartfelt"*, *"Make Funny"*, *"Make Formal"*.  
  * [ ] **Task 4.4**: Build "Accept & Apply" / "Revert" text replacement controls directly syncing AI outputs to card text state with toast feedback.  
  * [ ] **Task 4.5**: Implement "Save Draft" functionality converting card state into JSON and storing it in Firebase Firestore with toast alert (*"Draft auto-saved to My Collections!"*).  
  * [ ] **Task 4.6**: Implement Export & Download engine supporting PNG/JPEG downloads and window print PDF generation matching prototype behavior.  
* **Deliverable**: Integrated AI writing assistant, draft persistence with toast alerts, and PDF/PNG card export tools.

### **Phase 5: Collections Dashboard, QA & Launch (Week 8)**

**Goal**: Build the user card gallery with saved drafts list and Edit/Open, Duplicate, Delete action buttons, conduct end-to-end testing, and deploy to production.

* **Tasks**:  
  * [ ] **Task 5.1**: Build "My Cards Collections" gallery view displaying saved drafts list with title, category badge, timestamp, stickers row, and draft tag.  
  * [ ] **Task 5.2**: Implement collection item action buttons: Edit/Open, Duplicate (copying card state), and Delete.  
  * [ ] **Task 5.3**: Conduct accessibility audit (WCAG 2.1 AA) for keyboard navigation, screen reader ARIA labels, and 4.5:1 color contrast.  
  * [ ] **Task 5.4**: Run automated E2E testing suite (Playwright/Cypress) covering the complete user journey: *Google Auth → 3-Step Wizard → Card Studio → AI Rewriting → Save Draft → PDF/PNG Download*.  
  * [ ] **Task 5.5**: Perform cross-browser and mobile responsive checks across Desktop (1280px+), Tablet (768px), and Mobile (375px) viewports.  
  * [ ] **Task 5.6**: Final production deployment on Firebase Hosting with custom domain configuration.  
* **Deliverable**: Complete, battle-tested, publicly accessible CardCraft production release.

## **5. Team Roles & Resource Allocation**

| Role | Responsibilities | Allocation |
| :---- | :---- | :---- |
| **Lead Frontend Engineer** | Angular architecture, Angular Card Studio implementation, design tokens, theme service, toast system. | Full-Time (Weeks 1–8) |
| **Full-Stack / Backend Engineer** | Firebase Auth, Firestore schema, Firebase Cloud Functions for OpenAI API, PDF/PNG export service. | Full-Time (Weeks 1–8) |
| **UI/UX Designer** | Pastel green design system, light/dark theme tokens, sticker assets & affordances, wizard UI/UX. | Part-Time (Weeks 1–4) |
| **QA / E2E Automation Engineer** | Playwright test suites, cross-browser verification, WCAG AA accessibility profiling. | Part-Time (Weeks 5–8) |

## **6. Risk Management & Mitigation Strategies**

| Risk | Impact | Probability | Mitigation Strategy |
| :---- | :---- | :---- | :---- |
| **AI Response Latency** (> 1s response time) | Medium | Medium | Use gpt-4o-mini with optimistic UI loading states in the AI sidekick drawer. |
| **Export Layout Differences across Browsers** | Medium | Medium | Standardize CSS `@media print` rules and print container dimensions matching prototype styling. |
| **Theme Contrast Issues in Dark Mode** | Low | Low | Enforce strict Tailwind CSS color tokens with automated contrast checking scripts during build time. |

## **7. Definition of Done (DoD) Checklist**

* [ ] All 14 Functional Requirements (FR1–FR14) implemented and verified against prototype specs.  
* [ ] All 5 Non-Functional Requirements (NFR1–NFR5) met (60 FPS rendering, < 1s AI response, WCAG 2.1 AA 4.5:1 contrast).  
* [ ] Light and Dark modes seamlessly toggleable with 10-step pastel green visual identity maintained.  
* [ ] Toast notification system active confirming draft saves, sticker additions, and AI transformations.  
* [ ] Automated Playwright E2E tests passing for authentication, 3-step wizard, card studio editor, AI assistant, and downloading.  
* [ ] Zero critical or high-severity security vulnerabilities with Firebase Security Rules active.  
* [ ] Code reviewed, merged to main, and deployed live to production on Firebase Hosting.