Budget App · Frontender.itacademy
A single-page web app to build and share instant quotes for digital services (SEO, Ads and Web).
The client picks services, customizes the Web service, enters contact details and gets an itemized
quote with its own unique URL. 

(./assets/captura -1.png)
Preview
![Budget App preview](docs/preview.png)

Features
Feature	Description
Dynamic total	Select SEO, Ads and/or Web and see the total update instantly.
Web configurator	Pages and languages: (pages + languages) × 30 € + 500 €.
Client form	Name, phone and email with validation and clear error messages.
Quote creation	Unique ID, date, itemized costs and total in a single view.
History	List of saved quotes with search by name and sorting by date, amount or name.
Unique URL	Every quote has its own page at /budget/:id.
Tech stack
React 19 + TypeScript (strict, no any)
Tailwind CSS (mobile-first, md: breakpoint)
React Router
Zod (form validation)
Vitest + Testing Library (unit tests written as Gherkin scenarios)
Data and texts configurable via JSON (src/data)
Persistence: localStorage (MVP)
Getting started
Requirements: Node.js 22 or later.

```bash
git clone https://github.com/mirelledesa/Budget.git
cd Budget/budget-app
npm install
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173).

Scripts
Command	What it does
npm run dev	Starts the development server.
npm run build	Type-checks and builds for production.
npm run test -- --run	Runs the unit tests once.
npm run test:coverage	Runs the tests and prints the coverage report.
How to use
Tick one or more services. The total updates as you go.
If you tick Web, set the number of pages and languages. The ⓘ button explains the cost.
Fill in name, phone and email, then press Sol·licitar pressupost.
The quote appears below the form, and it is saved in the history.
In Pressupostos en curs you can search by name, sort by date, amount or name, and click a name to open the quote page.
Copy the address of the quote page to share it.
Project structure
```
budget-app/src
├── components/ presentational UI
├── constants/ named constants (no magic numbers)
├── data/ services.json and ca.json (all texts)
├── hooks/ state and logic (custom hooks)
├── pages/ route-level views
├── services/ data access (localStorage)
├── test/ unit tests (Gherkin scenarios)
├── types/ TypeScript interfaces
└── utils/ pure functions (calculation, validation, lists)
```

Documentation
Planning artifacts live in [docs/](docs): backlog with user stories, Kanban board, user flow,
user journey, calculation logic, architecture, data model, UX/UI improvements and the demo script.

Git workflow
Git Flow: one feature/* branch per feature, merged into develop through Pull Requests after
validation, and develop merged into main for the release. Commits follow semantic messages
(feat:, fix:, refactor:, test:, docs:, chore:).

Accessibility
Semantic HTML and landmarks, labelled form fields, live regions for feedback (role="status" and
role="alert"), keyboard navigation with visible focus, a native <dialog> modal, text contrast
checked against WCAG, and touch targets of at least 24px.

Known limitations
Quotes are stored in the browser (localStorage), so a quote link opens only in the browser where
it was created. A backend would remove this limit. PDF export is out of scope for this MVP.

Author
Mirelle · @mirelledesa · IT Academy Barcelona Activa