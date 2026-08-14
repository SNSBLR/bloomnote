# Tester Skill

## Purpose

This skill defines how to test, verify, and validate the GenC web application.

The goal is to make sure that the application works according to the Product Requirements Document, all required features function correctly, and the main user journey can be completed without errors.

## Testing Principles

* Test features according to the project requirements.
* Verify acceptance criteria before considering a feature complete.
* Test both normal and invalid user actions.
* Test the complete user journey, not only individual features.
* Report actual problems clearly.
* Re-test features after bugs are fixed.
* Avoid changing application code unless specifically asked.
* Do not consider a feature complete only because the UI appears correct.

## Features to Test

The tester should verify the following major features:

* User Authentication
* Theme Selection
* Template Gallery
* Card Editor
* Text Customization
* JPEG Download
* My Projects
* Profile
* Settings
* Sidebar Navigation
* Responsive Design
* Accessibility

## Authentication Testing

Test the following:

### Sign Up

Verify that:

* A user can create an account.
* Required fields are validated.
* Invalid input is handled appropriately.
* Appropriate feedback is provided when registration fails.

### Log In

Verify that:

* A registered user can log in.
* Invalid credentials are handled correctly.
* Successful login redirects the user to the Theme Selection page.

### Log Out

Verify that:

* The user can log out.
* The authenticated session is ended appropriately.
* Protected pages cannot be accessed after logout.

The PRD requires Sign Up, Log In, and Log Out functionality.

## Theme Selection Testing

Verify that the Theme Selection page displays:

* Birthday
* Apology
* Thanks
* Expressing Gratitude
* Marriage Invitation

Test that:

* Each theme can be selected.
* Selecting a theme opens the correct template gallery.
* The selected theme is correctly identified.

## Template Gallery Testing

Verify that:

* Templates are displayed for the selected theme.
* Template thumbnails are visible.
* Templates are selectable.
* Selecting a template opens the Card Editor.
* The correct template is passed to the editor.

## Card Editor Testing

Verify that:

* The selected template is displayed.
* Users can write text.
* Users can edit text.
* Users can delete text.
* Changes are reflected visually in real time.
* The editor remains usable during customization.

The PRD specifically requires write, edit, delete, and real-time text customization.

## JPEG Download Testing

Verify that:

* A Download button is available.
* The customized card is captured correctly.
* The generated output is a JPEG image.
* The customized text appears in the downloaded image.
* The image downloads successfully to the user's device.
* The download process completes within a reasonable time.

## My Projects Testing

Verify that:

* Previously created cards are displayed.
* Project thumbnails are displayed correctly.
* A user can select a project.
* A saved project can be viewed.
* A saved project can be edited.
* A project can be downloaded again.

## Profile Testing

Verify that:

* The Profile page can be opened.
* The user's email is displayed.
* Basic user details are displayed correctly.
* The profile is associated with the correct authenticated user.

The PRD requires a Profile view displaying the user's email and details.

## Sidebar Testing

Verify that the authenticated sidebar provides navigation to:

* Dashboard
* My Projects
* Profile
* Settings

Test that:

* Each navigation item works.
* The correct page opens.
* Navigation remains available on authenticated pages.
* Navigation does not break existing functionality.

## Responsive Testing

Test the application on:

* Desktop
* Tablet
* Mobile

Verify that:

* Content fits correctly on the screen.
* Buttons remain usable.
* Forms remain usable.
* Templates are displayed correctly.
* The Card Editor remains usable.
* Sidebar navigation remains accessible.
* Text does not overlap.
* Images do not overflow.
* No horizontal scrolling occurs unnecessarily.

The PRD requires the application to be responsive across standard desktop and mobile browsers.

## Accessibility Testing

Use WCAG 2.1 AA as the project's accessibility baseline.

Check:

* Keyboard navigation.
* Form labels.
* Button accessibility.
* Link accessibility.
* Image alternative text.
* Logical heading structure.
* Visible focus states.
* Readable text.
* Appropriate interaction feedback.

The PRD explicitly identifies WCAG 2.1 AA as the accessibility baseline.

## Functional Testing

For every feature:

1. Identify the expected behavior.
2. Perform the required action.
3. Observe the actual result.
4. Compare the actual result with the expected result.
5. Record any difference as a defect.

## Negative Testing

Test invalid or unexpected actions such as:

* Empty form submission.
* Invalid login credentials.
* Invalid input.
* Selecting unavailable content.
* Attempting to access protected pages without authentication.
* Downloading before required content is available.
* Editing or opening invalid projects.

The application should handle invalid actions gracefully without crashing.

## End-to-End Testing

Test the complete critical user journey:

```text
Login
  ↓
Select Theme
  ↓
Select Template
  ↓
Edit Card
  ↓
Download JPEG
```

Verify that each step successfully connects to the next step.

The PRD specifically identifies the Login → Select Theme → Edit → Download journey for E2E testing.

## Unit Testing

Core utility functions should be tested individually.

Pay particular attention to:

* Validation functions.
* Card-related utility functions.
* Image-rendering functionality.
* Data transformation functions.

The PRD specifically requires unit testing for core utility functions, especially image rendering.

## Regression Testing

After a feature or bug fix is implemented:

1. Test the changed feature.
2. Test related features.
3. Test the critical user journey.
4. Check that previously working functionality still works.

Do not assume that a small code change cannot affect other features.

## Bug Reporting

When a defect is found, record:

* Bug title
* Feature affected
* Steps to reproduce
* Expected result
* Actual result
* Severity
* Environment
* Relevant screenshots or error messages when available

Use clear and concise descriptions.

Example:

```text
Bug: Download button does not generate JPEG

Feature: Card Editor

Steps:
1. Login
2. Select Birthday
3. Select a template
4. Edit the card text
5. Click Download

Expected:
A customized JPEG should be downloaded.

Actual:
Nothing happens after clicking Download.

Severity:
High
```

## Browser Testing

Check the application in the available modern browsers when required.

At minimum, verify that core functionality works in the project's supported browser environment.

Pay particular attention to:

* JavaScript errors
* Layout problems
* Download behavior
* Form behavior
* Responsive behavior

## Console Error Checking

After testing a feature:

* Check the browser console.
* Identify JavaScript errors.
* Identify failed resource requests.
* Identify relevant warnings.
* Determine whether errors affect functionality.

Do not ignore errors related to the tested feature.

## Acceptance Criteria

A feature should only be considered **Passed** when:

* The required functionality works.
* The acceptance criteria are satisfied.
* Invalid input is handled appropriately.
* Related functionality continues to work.
* Responsive behavior is acceptable.
* No critical errors are present.

## Test Completion

Testing is complete when:

* All required features have been tested.
* Acceptance criteria have been verified.
* Critical user journeys have been tested.
* Responsive behavior has been checked.
* Accessibility requirements have been checked.
* Identified critical defects have been resolved or formally accepted.
* Regression testing has been completed.

## Expected Result

The GenC application should provide a stable and reliable experience where users can:

```text
Register / Login
       ↓
Select Theme
       ↓
Select Template
       ↓
Customize Card
       ↓
Download JPEG
       ↓
Manage Projects
```

All major functionality should work according to the GenC PRD before the application is considered ready.
