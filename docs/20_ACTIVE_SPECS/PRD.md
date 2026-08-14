# **CardCraft Product Requirements Document (PRD)**

## **Goals and Background Context**

### **Goals**

* Provide an effortless, step-by-step digital card creation wizard (Occasion → Format → Theme → Card Studio).  
* Empower users with an integrated AI writing assistant (Grammarly-style) to refine, rephrase, lengthen, shorten, or tune the tone of card messages (*Fix Grammar*, *Shorten*, *Elongate*, *Make Heartfelt*, *Make Funny*, *Make Formal*).  
* Deliver an interactive card editor built with React DOM state and inline Tailwind CSS supporting 6 curated Google Fonts, dual text/background color pickers, pastel sticker overlays with affordance tooltips, and sample photo attachment.  
* Offer persistent draft saving with toast feedback notifications, collections gallery management (Edit/Open, Duplicate, Delete), and PDF/PNG export capabilities.  
* Establish a soothing, delight-focused user interface featuring a signature 10-step pastel green design system, dark/light theme switching, a collapsible sidebar menu, and embedded interactive project documentation viewers.

### **Background Context**

Digital greeting cards and personalized messages serve as meaningful bridge-builders for human connection. However, many current digital card platforms suffer from cluttered interfaces, overwhelming editing options, or a lack of creative writing support. Users frequently struggle to find the right words or express sincere emotions concisely.

CardCraft solves these pain points by uniting a structured, intuitive design workflow with a smart AI copywriting assistant. Wrapped in an accessible pastel green aesthetic (`pastel-50` to `pastel-900`, plus sage, mint, blush, lavender, cream) with dark/light mode versatility and seamless session persistence, CardCraft makes crafting memorable personalized cards fast, enjoyable, and expressive for users across desktop and mobile devices.

## **Requirements**

### **Functional**

* **FR1: Authentication & Onboarding**: Users can sign up and log in using standard email credentials or OAuth 2.0 ("Sign in with Google").  
* **FR2: User Profile Management**: The top-right header displays the user's avatar, account name, email, Google OAuth badge, and a profile dropdown menu with "My Saved Cards" and "Sign Out".  
* **FR3: Collapsible Navigation Menu**: A left sidebar includes "Create / New" and "My Cards Collections" navigation options, equipped with an arrow toggle button to collapse (icon-only) or expand the sidebar.  
* **FR4: Dark / Light Mode Toggle**: Located at the bottom of the left sidebar, allowing instant switching between Light Mode (pastel green accents dominant) and Dark Mode (dark pastel forest green accents) with localStorage persistence.  
* **FR5: Occasion Selection (Step 1)**: Users can select from six card categories: Gratitude (🙏), Apology (🕊️), Invitation (💌), Birthday (🎂), Get Well Soon (🌸), and Special Occasions (🎉).  
* **FR6: Format Selection (Step 2)**: Displays layout formats synchronized with prototype: Folding Vertical, Portrait Single, Landscape Panoramic, and Square Social.  
* **FR7: Theme Selection (Step 3)**: Offers 6 curated visual themes synchronized with prototype: Soft Botanical, Pastel Floral, Warm Sunset, Celestial Gold, Mint Geometric, and Cozy Watercolor.  
* **FR8: Canvas Text Editing & Typography**: Interactive card editor built using React DOM state with inline Tailwind CSS, supporting 6 Google Fonts: Playfair (Serif), Dancing (Cursive), Caveat (Hand), Pacifico (Fun), Montserrat (Clean), and Poppins (Modern), alongside dual text and background color pickers.  
* **FR9: Media & Stickers**: Users can attach sample photos and browse/place 12 pastel decorative stickers (🌿, ✨, 🌸, 🕊️, 💌, 💖, 🎈, 🎉, 🍵, 🎀, ⭐, 🦋) with visual hover tooltips (`title="Click to add/remove sticker"`) and active selection badges.  
* **FR10: Grammarly-Style AI Writing Assistant**: An integrated sidekick widget docked alongside card text fields with 1-click transformation triggers: *Fix Grammar*, *Shorten*, *Elongate*, *Make Heartfelt*, *Make Funny*, and *Make Formal*.  
* **FR11: Draft Persistence & Toast Feedback**: Users can save cards in progress as "Drafts" stored in PostgreSQL/Supabase with instant toast notifications (*"Draft saved to My Collections!"*).  
* **FR12: Export Options**: Users can download/print completed cards in PNG/JPEG raster format or PDF document format.  
* **FR13: My Cards Collections**: A gallery view displaying saved drafts list with title, category badge, timestamp, stickers row, draft tag, and quick actions (Edit/Open, Duplicate, Delete).  
* **FR14: Embedded Project Documentation Viewers**: The left sidebar includes a "Project Docs" section providing interactive in-app viewers and PDF exports for the Product Requirements Document (PRD), Master Project Plan, and Current Plan.

### **Non-Functional**

* **NFR1: Canvas & UI Performance**: Interactive card manipulation and live state updates must maintain 60 FPS rendering speed.  
* **NFR2: AI Response Time**: Text generation and rephrasing requests via the AI Assistant must respond within < 1 second.  
* **NFR3: Visual Consistency**: The primary theme must strictly adhere to the 10-step pastel green palette (`pastel-50`: `#f2f8f4` through `pastel-900`: `#233f2c`) with named pastel accent tokens (`sage`: `#d8e2dc`, `mint`: `#e8f5e9`, `cream`: `#faf9f6`, `blush`: `#fec89a`, `lavender`: `#e8e8e4`).  
* **NFR4: Security & Privacy**: User-uploaded images, draft cards, and profile data must be securely encrypted and scoped exclusively to the authenticated user via Supabase Row-Level Security (RLS).  
* **NFR5: Responsiveness**: The UI layout must adapt seamlessly across Desktop (1280px+), Tablet (768px–1023px), and Mobile (<768px) viewports.

## **User Interface Design Goals**

### **Overall UX Vision**

A clean, serene, and playful card workspace. The signature soft pastel green color scheme invokes creativity, calm, and warmth. The flow guides the user effortlessly through structured decisions (Occasion → Format → Theme) into an unconstrained, joyful editing environment.

### **Key Interaction Paradigms**

* **3-Step Guided Wizard**: Linear progressive steps (Occasion → Format → Theme) leading directly to the Card Studio.  
* **Collapsible Drawer Navigation**: Left sidebar with click-to-collapse arrow toggle button.  
* **React DOM Canvas Manipulation**: Dynamic live text rendering, font selection, background color, sticker badges with hover tooltips, and sample photo attachment.  
* **Contextual AI Writing Drawer**: A slide-out AI assistant docked next to text fields offering quick action buttons (*Fix Grammar*, *Shorten*, *Elongate*, *Make Heartfelt*, *Make Funny*, *Make Formal*).  
* **Toast Notification System**: Non-blocking toast banners confirming auto-saves, sticker additions, and AI text refinements.

### **Core Screens and Views**

* **Login / Auth Screen**: Clean landing page with email/password input and prominent "Sign in with Google" OAuth button.  
* **Step 1: Occasion Selection Page**: Visual grid showcasing Gratitude, Apology, Invitation, Birthday, Get Well Soon, and Special Occasions.  
* **Step 2: Format Selection Page**: Layout template selection cards: Folding Vertical, Portrait Single, Landscape Panoramic, and Square Social.  
* **Step 3: Theme Selection Page**: Curated pastel visual preview cards featuring 6 themes: Soft Botanical, Pastel Floral, Warm Sunset, Celestial Gold, Mint Geometric, and Cozy Watercolor.  
* **Card Design Studio (Editor)**: Main interactive screen featuring live React DOM card preview canvas, left customization tools (Heading, Message, 6 Google Fonts, Dual Color Pickers, Stickers, Sample Photo), Save Draft, Download/Print buttons, and floating AI Assistant drawer.  
* **My Cards Collections View**: Saved drafts list displaying cards with category badges, status tags, stickers, and Edit/Open, Duplicate, Delete action buttons.  
* **In-App Project Docs View**: Embedded interactive viewers for PRD, Master Project Plan, and Current Plan with dedicated PDF export triggers.

### **Accessibility: WCAG 2.1 AA**

* Contrast ratio of text against pastel backgrounds meets minimum **4.5:1** AA standard.  
* Full keyboard navigation for sidebar menu items, wizard steps, and studio controls.  
* Screen reader ARIA labels for tools, stickers, and theme toggles.

### **Branding**

* **Product Name**: **CardCraft**  
* **Primary Pastel Palette**:
  - `pastel-50`: `#f2f8f4` | `pastel-100`: `#e1efe5` | `pastel-200`: `#c5e0cd` | `pastel-300`: `#9ecaa9`
  - `pastel-400`: `#72ad81` | `pastel-500`: `#509161` | `pastel-600`: `#3c744c` | `pastel-700`: `#325d3f`
  - `pastel-800`: `#2a4b34` | `pastel-900`: `#233f2c`
* **Pastel Accents**: Sage (`#d8e2dc`), Mint (`#e8f5e9`), Cream (`#faf9f6`), Blush (`#fec89a`), Lavender (`#e8e8e4`).  
* **Dark Mode Palette**: Forest Pastel Gray (`#1B2E23`, `#2D4736`, `#3C744C`).  
* **Typography Hierarchy**:
  - Headings/Body: Poppins (Modern), Montserrat (Clean)
  - Serif/Cursive/Handwriting: Playfair (Serif), Dancing (Cursive), Caveat (Hand), Pacifico (Fun)

## **Technical Assumptions**

### **Repository Structure: Monorepo**

* Next.js 14+ App Router monorepo containing client studio components, serverless API endpoints (`/api/ai/transform`), Supabase authentication/database schemas, and PDF export handlers.

### **Service Architecture**

* **Frontend Framework**: Next.js 14+ (React 18), Tailwind CSS with custom pastel design tokens, Framer Motion for sidebar/wizard transitions.  
* **Card Studio Implementation**: React DOM state architecture with inline Tailwind CSS for live card rendering.  
* **Backend & Database**: Supabase (PostgreSQL + Auth + Row Level Security + Object Storage for photo assets).  
* **AI LLM Integration**: OpenAI API (`gpt-4o-mini`) for real-time text transformation (*Fix Grammar*, *Shorten*, *Elongate*, *Make Heartfelt*, *Make Funny*, *Make Formal*).  
* **Export Engine**: Browser window print trigger and PDF/PNG export engine.

---

## **Epics & Acceptance Criteria**

### **Epic 1: Foundation, Navigation & Authentication**
* **Story 1.1**: Project setup with Next.js, Tailwind 10-step pastel design tokens + accents, and localStorage ThemeProvider.
* **Story 1.2**: Authentication with Google OAuth 2.0, top header profile dropdown, and logout trigger.
* **Story 1.3**: Collapsible left sidebar with arrow toggle button, navigation links, embedded Project Docs viewer links, and dark/light theme switch.

### **Epic 2: Card Creation Wizard Flow**
* **Story 2.1**: Step 1 Occasion Selection grid (6 categories).
* **Story 2.2**: Step 2 Format Selection (Folding Vertical, Portrait Single, Landscape Panoramic, Square Social).
* **Story 2.3**: Step 3 Theme Selection (Soft Botanical, Pastel Floral, Warm Sunset, Celestial Gold, Mint Geometric, Cozy Watercolor).

### **Epic 3: Interactive Card Editor Studio**
* **Story 3.1**: React DOM state card workspace with inline Tailwind CSS, inline text editing, 6 Google Fonts (Playfair, Dancing, Caveat, Pacifico, Montserrat, Poppins), and dual color pickers.
* **Story 3.2**: 12 pastel sticker overlay drawer with tooltips and sample photo attachment tool.

### **Epic 4: Grammarly-Style AI Writing Assistant**
* **Story 4.1**: Floating AI Assistant sidekick drawer with 1-click transformation triggers (*Fix Grammar*, *Shorten*, *Elongate*, *Make Heartfelt*, *Make Funny*, *Make Formal*) and toast feedback controls.

### **Epic 5: Persistence, Collections, In-App Docs & Export**
* **Story 5.1**: Save Draft functionality to Supabase PostgreSQL state, toast notifications, and PDF/PNG export engine.
* **Story 5.2**: My Cards Collections gallery displaying saved drafts list with Edit/Open, Duplicate, and Delete action buttons.
* **Story 5.3**: Embedded Project Docs view allowing users to read and export PDF reports for PRD, Master Project Plan, and Current Plan.