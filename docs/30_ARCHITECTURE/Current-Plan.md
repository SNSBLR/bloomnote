# **Current Plan**

## **1. Executive Summary & Architectural Overview**

The **Interactive Card Studio and AI Writing Assistant** form the core creation experience of CardCraft AI. This system bridges a 3-step creation wizard with an interactive HTML5 canvas workspace, providing user-friendly card personalization, instant visual customization, and smart AI copywriting support.

All UI elements strictly adhere to the signature pastel green visual design system, supporting seamless switching between Light Mode (soft sage, mint, and cream tones) and Dark Mode (muted deep forest greens and dark slate accents).

### **Primary System Objectives**

1. **Interactive Canvas Rendering**: Maintain a continuous 60 frames-per-second interactive rendering loop during text dragging, sticker scaling, and image transformation.
2. **Real-Time AI Streaming**: Deliver contextual writing transformations within 1.5 seconds through streamed server responses directly into an adjacent sidekick drawer.
3. **Non-Destructive Editing & History**: Provide a clear text comparison view before applying changes, complete with multi-level undo/redo operations.
4. **Print-Ready Resolution Engine**: Convert web-based canvas representations into 300 DPI high-definition PNG, JPEG, and vector PDF exports.

---

## **2. Phase-by-Phase Technical & Functional Implementation Steps**

### **Phase 1: Environment Initialization & Layout Architecture**

#### **Step 1.1: Workspace Layout & Collapsible Sidebar Setup**

- [ ] Configure a flexible two-region studio layout: a left-hand navigation sidebar and a central canvas editing area flanked by contextual floating toolbars.
- [ ] Implement the collapsible left sidebar featuring options for "Create / New" and "My Cards Collections".
- [ ] Construct a smooth slide-and-fold animation for the sidebar trigger arrow. When collapsed, the menu contracts to icon-only view, maximizing the visible editing space for the card canvas.
- [ ] Place the theme context toggle at the bottom of the sidebar, allowing immediate application-wide transitions between Light Mode and Dark Mode.

#### **Step 1.2: Canvas Container & Display Scaling**

- [ ] Initialize an HTML5 Canvas element wrapped inside an auto-resizing parent container.
- [ ] Compute the physical device pixel ratio to scale the internal canvas resolution for Retina and High-DPI screens, preventing blurry text or fuzzy graphic elements.
- [ ] Set up dynamic aspect-ratio constraints based on the user's selected format from the wizard:
  - [ ] **Portrait**: 4:5 aspect ratio.
  - [ ] **Landscape**: 5:4 aspect ratio.
  - [ ] **Square**: 1:1 aspect ratio.
  - [ ] **Folded**: 2-panel side-by-side card template representation.
- [ ] Apply background canvas styling derived from the user's selected aesthetic theme (such as Minimalist, Botanical, Modern Retro, Festive, or Watercolor).

---

### **Phase 2: Typography Engine & Inline Text Editing**

#### **Step 2.1: Custom Web Font Loading Pipeline**

- [ ] Integrate a dynamic web-font loader to stream customized font families into the browser before canvas initialization.
- [ ] Support curated typography categories:
  - [ ] **Cursive & Script**: Elegantly flowing styles for formal or heartfelt cards.
  - [ ] **Handwritten**: Casual, friendly styles for personal notes.
  - [ ] **Serif**: Classic, sophisticated styles for traditional announcements.
  - [ ] **Sans-Serif**: Clean, modern styles for contemporary greeting messages.
- [ ] Implement font preload detection so text rendered on the canvas never suffers from missing glyphs or default browser fallback swapping during render cycles.

#### **Step 2.2: Contextual Typography Floating Toolbar**

- [ ] Construct a floating top toolbar that activates automatically whenever a text object is focused on the canvas.
- [ ] Include granular typography controls:
  - [ ] **Font Family Selector**: Dropdown showing font name previews rendered in their native style.
  - [ ] **Font Size Controls**: Incremental step buttons and direct numeric input.
  - [ ] **Color Palette Picker**: Swatches pre-configured with soft pastel tones, complementary dark mode accents, and a custom visual color wheel.
  - [ ] **Text Alignment**: Left, Center, Right, and Justify alignment toggles.
  - [ ] **Line Height & Letter Spacing**: Fine-tuning sliders to adjust sentence density and readability.
  - [ ] **Layer Z-Index Management**: Controls to bring text forward, send text backward, or lock text in place.

#### **Step 2.3: Inline Text Editing & Auto-Reflow Mechanics**

- [ ] Enable direct double-click editing on canvas text elements, transforming static canvas text into an active editable text area.
- [ ] Enforce automated line wrapping based on bounding box constraints so text automatically flows into new lines rather than expanding off the visible card margins.
- [ ] Re-calculate spatial bounding boxes dynamically as text is added or removed, ensuring transform handles scale proportionately.

---

### **Phase 3: Graphic Asset Pipeline — Stickers & Photo Uploads**

#### **Step 3.1: Categorized Decorative Sticker Drawer**

- [ ] Build a slide-out Sticker Gallery drawer categorized into functional groups: Emojis, Floral & Botanical, Ribbons & Frames, Celebration Badges, and Seasonal Ornaments.
- [ ] Store sticker assets as high-resolution SVG vector files to ensure crisp rendering at any zoom level or export resolution.
- [ ] Enable two placement mechanisms:
  - [ ] **Click-to-Place**: Clicking a sticker places it squarely in the center of the card.
  - [ ] **Drag-and-Drop**: Dragging a sticker directly over the canvas places it at the exact cursor coordinates upon release.
- [ ] Attach interactive transform handles to placed stickers for 360-degree rotation, uniform scaling, flipping horizontally/vertically, and deletion.

#### **Step 3.2: Custom Photo Upload & Layer Management Workflow**

- [ ] Build a local file upload component supporting standard image formats (PNG, JPEG, WebP).
- [ ] Process uploaded images through an internal validation pipeline:
  - [ ] Verify file size (maximum 10MB per image).
  - [ ] Check image dimension bounds to prevent browser memory exhaustion.
- [ ] Upload valid images to cloud object storage (Supabase or Firebase Storage) under a user-specific folder structure, receiving a secure CDN URL.
- [ ] Instantiate the uploaded photo onto the canvas with scaling handles, corner rounding controls, aspect-ratio locking, and z-index ordering tools.

---

### **Phase 4: Grammarly-Style AI Writing Assistant Integration**

#### **Step 4.1: Selection Listener & AI Drawer Activation**

- [ ] Implement a selection event listener on the canvas engine that monitors user interactions.
- [ ] When a text element is highlighted, extract its active text content, font metadata, and unique element ID, populating an internal Zustand state store.
- [ ] Trigger the slide-out AI Assistant Sidekick drawer on the right side of the screen with a smooth spring animation.
- [ ] Display the currently selected text inside an input preview box marked "Selected Canvas Text".

#### **Step 4.2: Structured AI Transformation Prompts & Backend Streaming**

- [ ] Configure quick-action prompt trigger buttons in the AI drawer interface:
  - [ ] **Fix Grammar**: Corrects spelling, punctuation, and grammatical mistakes while retaining original wording.
  - [ ] **Shorten**: Condenses long-winded messages into concise, high-impact card notes.
  - [ ] **Elongate**: Expands brief greetings into warm, expressive messages.
  - [ ] **Make Heartfelt**: Transforms text into emotional, sincere, and loving phrasing.
  - [ ] **Make Funny**: Infuses witty, lighthearted humor and playful tone.
  - [ ] **Make Formal**: Rephrases message into polite, elegant, and professional language.
  - [ ] **Make Poetic**: Converts standard prose into lyrical, rhythmic, or rhyming verse.
  - [ ] **Custom Instruction Input**: Allows users to type custom commands (e.g., "Write like a 19th-century novelist").
- [ ] Send transformation requests via a serverless POST request to the backend edge function connected to OpenAI (gpt-4o-mini).
- [ ] Enforce system prompt directives requiring the AI model to return **only** the transformed copy without conversational filler, greetings, or explanations.
- [ ] Process the AI response as a server-sent text stream, updating the UI chunk-by-chunk in real time to show character-by-character typing animations inside the suggestion preview box.

#### **Step 4.3: Differential Comparison & Direct Canvas Application**

- [ ] Display the incoming AI suggestion inside a pastel-green-tinted preview card with clear visual separation from the original text.
- [ ] Provide two primary action controls:
  - [ ] **Apply to Card**: Replaces the canvas text with the AI-generated version, triggers text bounding box recalculations to prevent layout overflow, and adds the edit to the history stack.
  - [ ] **Discard / Revert**: Clears the current AI suggestion and restores the original text display without altering the canvas state.

---

### **Phase 5: State Persistence, Draft Management & Undo History**

#### **Step 5.1: Canvas Serialization & Auto-Save Pipeline**

- [ ] Implement a state converter that transforms the complete HTML5 canvas representation — including text strings, font styles, colors, positions, sticker layer order, and photo URLs — into a clean JSON schema object.
- [ ] Set up a debounced auto-save listener that triggers 3 seconds after the user stops making canvas modifications.
- [ ] Transmit the JSON canvas state alongside thumbnail metadata to the database (Supabase/PostgreSQL), linking it to the user's account ID under "Saved Drafts".
- [ ] Display an unobtrusive status indicator in the top header showing "Saving...", "All changes saved", or "Offline mode".

#### **Step 5.2: Multi-Level History Stack (Undo / Redo)**

- [ ] Maintain an in-memory undo and redo snapshot stack capturing significant canvas operations:
  - [ ] Text content or style changes.
  - [ ] Addition or removal of stickers and photos.
  - [ ] Movement, scaling, or rotation of canvas objects.
- [ ] Expose "Undo" and "Redo" buttons in the studio header, allowing users to navigate backward and forward through their design steps effortlessly.

---

### **Phase 6: High-Resolution Rendering & Export Engine**

#### **Step 6.1: Multi-Format High-Res Rasterization (PNG & JPEG)**

- [ ] When the user clicks "Download Card", open an export configuration modal offering format selections (PNG, JPEG, PDF) and quality settings.
- [ ] To produce print-ready output, construct an offscreen high-resolution clone of the canvas scaled to 300 Dots Per Inch (DPI) rather than screen resolution (72 DPI).
- [ ] Re-render all SVG stickers and high-res source photos onto the high-DPI canvas to prevent pixelation.
- [ ] Export the rasterized image stream as a blob, triggering an automatic file download in the user's browser with a descriptive filename (e.g., `My_Birthday_Card_CardCraft.png`).

#### **Step 6.2: Vector & Document PDF Generation**

- [ ] For PDF downloads, initialize a document layout instance matching the precise physical dimensions of the card format (e.g., 5" × 7" for standard portrait greeting cards).
- [ ] Embed the rasterized high-resolution canvas print render onto the PDF page template.
- [ ] Provide multi-page PDF generation for folded two-panel card formats (Front Cover, Inside Left, Inside Right, Back Cover).

---

## **3. User Interface & Design System Specification**

### **Color Token Application Matrix**

| UI Region | Light Mode Pastel Token | Dark Mode Forest Token |
| :---- | :---- | :---- |
| **Studio Background** | Crisp Warm White / Soft Cream (`#F9FBF8`) | Muted Dark Forest (`#122017`) |
| **Canvas Area Border** | Pastel Mint Border (`#C8E6C9`) | Deep Sage Border (`#2D4736`) |
| **Sidebar Navigation** | Soft Pastel Green (`#E8F5E9`) | Dark Slate Green (`#1B2E23`) |
| **Primary Buttons** | Vibrant Pastel Green (`#81C784`) | Medium Mint Green (`#A5D6A7`) |
| **AI Sidekick Drawer** | Frosted Mint Glass (`#E8F5E9` @ 90% opacity) | Dark Glass Surface (`#1B2E23` @ 90% opacity) |
| **Active Selection Ring** | Sage Focus Ring (`#4CAF50`) | Bright Mint Ring (`#81C784`) |

### **Responsive Viewport Adaptations**

- **Desktop Viewports (1280px and wider)**: Full side-by-side view with left navigation, central canvas workspace, floating typography bar, and right-hand AI sidekick drawer open concurrently.
- **Tablet Viewports (768px to 1279px)**: Left navigation collapses to an icon sidebar by default; AI drawer opens as an overlay over the right side of the canvas workspace.
- **Mobile Viewports (Below 768px)**: UI simplifies into a single-column layout. The toolbar moves to a bottom sticky bar; the AI sidekick transforms into a full-screen bottom sheet modal.

---

## **4. Edge Case Handling & Performance Safeguards**

- [ ] **AI Network Disruption During Streaming**: If the connection drops while the AI assistant is streaming text, freeze the partial text, display an inline notification ("Connection interrupted. Retrying..."), and keep the original text intact on the canvas.
- [ ] **Heavy Graphic Memory Leak Prevention**: When users load multiple photos or dozens of stickers, release unneeded offscreen image memory caches during canvas state transitions.
- [ ] **Typography Overflow Mitigation**: If an AI transformation returns text significantly longer than the original text box, automatically adjust font size down incrementally until the message fits within the maximum bounds of the card design area.
- [ ] **Offline Canvas Persistence**: If the internet connection fails, temporarily store canvas updates in local browser storage (`localStorage`), syncing with the backend database once connectivity is restored.

---

## **5. Verification & Testing Protocol**

- [ ] **Canvas Smoothness Test**: Drag complex photo and sticker layers across the canvas while recording framerate, verifying performance remains steady at 60 FPS.
- [ ] **AI Transformation Timing**: Trigger every preset action ("Fix Grammar", "Make Heartfelt", etc.) and verify response streaming initiates within 1.5 seconds.
- [ ] **Theme Toggle Validation**: Switch between Light and Dark mode during active editing, ensuring canvas content remains unchanged while surrounding UI elements transition smoothly.
- [ ] **Draft Restoration Audit**: Edit a card, navigate to "My Cards Collections", re-open the saved draft, and verify that all text formatting, stickers, and photo layer positions restore accurately.
- [ ] **Export Resolution Check**: Export a completed card as a PDF/PNG file and zoom in to 300% to confirm text edges and image details remain crisp and print-ready.