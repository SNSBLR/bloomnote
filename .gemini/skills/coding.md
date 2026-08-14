# Coding Skill

## Purpose

This skill defines how code should be written, modified, and maintained for the GenC web application.

The goal is to produce clean, simple, maintainable, responsive, and functional code that follows the project requirements.

## Technology

Use:

* HTML5 for page structure
* CSS3 for styling and responsive design
* JavaScript (ES6+) for application logic and interactions

Do not introduce frontend frameworks or libraries unless explicitly requested.

## Coding Principles

* Keep the code simple and readable.
* Use meaningful names for files, variables, functions, classes, and IDs.
* Avoid unnecessary code duplication.
* Keep HTML, CSS, and JavaScript separated.
* Create reusable functions and components where appropriate.
* Avoid unnecessary global variables.
* Add comments only where they help explain complex logic.
* Do not change existing functionality unnecessarily.
* Follow the existing project structure and coding style.
* Do not add features that are outside the project requirements unless requested.

## HTML Guidelines

* Use semantic HTML5 elements.
* Maintain a clear page structure.
* Use appropriate headings.
* Use labels for form inputs.
* Use buttons for actions instead of clickable non-button elements.
* Provide meaningful `alt` text for important images.
* Keep HTML easy to read and maintain.

## CSS Guidelines

* Use organized and reusable CSS.
* Prefer Flexbox and CSS Grid for layouts.
* Use responsive design techniques.
* Maintain consistent spacing, typography, and sizing.
* Keep styles modular where practical.
* Avoid excessive inline styles.
* Ensure buttons, forms, cards, galleries, and navigation have consistent styling.
* Make the application usable on desktop, tablet, and mobile.

## JavaScript Guidelines

* Use modern JavaScript syntax.
* Keep functions focused on a single responsibility.
* Use event listeners for user interactions.
* Validate user input where required.
* Handle errors gracefully.
* Avoid unnecessary DOM manipulation.
* Keep application state organized.
* Avoid duplicated event-handling logic.
* Use clear function and variable names.

## GenC Features

When implementing code, support the following project features:

### Authentication

Implement the frontend behavior required for:

* Sign Up
* Log In
* Log Out
* Authentication-related form validation
* Redirecting users after login

The PRD requires users to be redirected to the Theme Selection page after successful login.

### Theme Selection

Support the following themes:

* Birthday
* Apology
* Thanks
* Expressing Gratitude
* Marriage Invitation

Selecting a theme should display the appropriate templates.

### Template Gallery

The code should:

* Display template thumbnails.
* Organize templates by theme.
* Allow users to select a template.
* Navigate the selected template to the Card Editor.

### Card Editor

The editor should allow users to:

* View the selected template.
* Write text.
* Edit text.
* Delete text.
* See changes reflected in real time.

### JPEG Download

Implement the required download interaction:

* Provide a Download button.
* Generate the customized card as a JPEG.
* Download the image to the user's device.

### My Projects

Implement functionality for:

* Displaying previously created cards.
* Showing project thumbnails.
* Opening saved projects.
* Editing existing projects.
* Re-downloading projects.

### Sidebar Navigation

Authenticated pages should provide navigation to:

* Dashboard
* My Projects
* Profile
* Settings

## Responsive Coding

All frontend code should consider:

* Desktop
* Tablet
* Mobile

Use responsive CSS and test layouts at different screen sizes.

The application is required to be responsive across standard desktop and mobile browsers.

## Accessibility

Follow the project's WCAG 2.1 AA baseline.

When writing code:

* Use semantic HTML.
* Associate labels with form controls.
* Ensure interactive elements are keyboard accessible.
* Maintain visible focus states.
* Use meaningful text for buttons and links.
* Provide appropriate alternative text for images.
* Maintain a logical heading structure.

## File Organization

Keep frontend files organized.

Example:

```text
project/
│
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── templates.html
├── editor.html
├── projects.html
├── profile.html
├── settings.html
│
├── css/
│   ├── style.css
│   ├── auth.css
│   ├── dashboard.css
│   ├── editor.css
│   └── responsive.css
│
├── js/
│   ├── auth.js
│   ├── dashboard.js
│   ├── templates.js
│   ├── editor.js
│   ├── projects.js
│   └── navigation.js
│
└── assets/
    ├── images/
    └── templates/
```

Use the actual repository structure if it differs from this example. Do not create unnecessary files.

## Before Writing Code

Before implementing a feature:

1. Read the relevant project requirement.
2. Identify the files that need to be changed.
3. Check existing HTML, CSS, and JavaScript.
4. Reuse existing code where possible.
5. Determine whether the change affects other features.
6. Implement only the required functionality.

## After Writing Code

After implementing a feature:

1. Check for syntax errors.
2. Check browser console errors.
3. Test the feature.
4. Test related existing functionality.
5. Check desktop and mobile layouts.
6. Verify that navigation works.
7. Verify that user interactions work as expected.
8. Make sure no unnecessary files or code were introduced.

## Error Handling

When an error occurs:

1. Identify the actual cause.
2. Check the relevant HTML, CSS, or JavaScript.
3. Fix the root cause instead of hiding the error.
4. Avoid breaking unrelated functionality.
5. Test the fix after making the change.

Do not ignore console errors or silently suppress errors without understanding them.

## Modification Rules

When modifying existing code:

* Read the existing implementation first.
* Make the smallest necessary change.
* Preserve existing working functionality.
* Do not rewrite an entire file when a smaller change is sufficient.
* Maintain the existing naming and file structure where practical.

## Testing

Code should support the project's required testing approach.

Important user journey:

```text
Login
  ↓
Select Theme
  ↓
Select Template
  ↓
Edit Card
  ↓
Download
```

The PRD identifies this as a critical journey for end-to-end testing.

## Definition of Done

Code is considered complete when:

* The requested functionality works.
* The implementation follows the PRD.
* HTML, CSS, and JavaScript are organized.
* The UI is responsive.
* Basic accessibility requirements are satisfied.
* Existing functionality continues to work.
* No unnecessary code or features are introduced.
* Browser console errors related to the implementation are resolved.
* The feature can be tested successfully.
