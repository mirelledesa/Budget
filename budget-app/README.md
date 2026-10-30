<div align="center">

# Budget App

### A clear price for your digital project, in a few clicks.

Pick your services, tune the details and get a transparent, shareable quote.<br>
No meetings. No back-and-forth. Just the number you need.

[![Live demo](https://img.shields.io/badge/Live_demo-open_the_app-5bb68a?style=for-the-badge)](https://http://localhost:5173/)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

<img src="assets/captura - 1.png" alt="Budget App home page on desktop" width="760">

</div>

---

## Why Budget App?

Asking for a price should not take a meeting. Budget App turns a slow, repetitive conversation into
an interactive experience:

- **Instant answers.** Clients see the cost of every option as they choose.
- **Total transparency.** Every quote is itemized: base price, customization and total.
- **Less repetitive work.** Sales teams stop answering the same preliminary questions.
- **Shareable.** Every quote has its own page and its own address.

## Screenshots

| Main screen | Quote | Quote detail |
|:---:|:---:|:---:|
| <img src="./src/assets/captura - 1.png" alt="History of generated quotes" width="260"> | <img src="./src/assets/Captura - 3.png" alt="Detailed quote page" width="260"> | <img src="./src/assets/Captura - 4.png" alt="Home page on a phone" width="160"> |

## Features

| | |
|---|---|
| **Live total** <br> Select SEO, Ads and/or Web and watch the price update instantly. | **Web configurator** <br> Choose pages and languages, with an info button that explains the cost. |
| **Smart form** <br> Name, phone and email with clear, friendly validation messages. | **Itemized quotes** <br> Unique ID, date, cost breakdown and total, all in a single view. |
| **Searchable history** <br> Find past quotes by name and sort by date, amount or name. | **Unique URL** <br> Open any quote at its own address: `/budget/:id`. |

## How it works

1. **Choose** one or more services. The total updates as you go.
2. **Customize** the Web service: pages and languages.
3. **Request** your quote with your contact details.
4. **Share** the quote page, or find it later in the history.

### Pricing at a glance

| Service | Price |
|---|---|
| SEO | 300 € |
| Ads | 400 € |
| Web | 500 € + 30 € for each page and each language |

*Example: Web with 4 pages and 2 languages + SEO = 500 + (4 + 2) × 30 + 300 = **980 €**.*
All prices live in `src/data/services.json`, so they can change without touching the code.

## Built with care

- **Responsive, mobile-first** design that follows the original prototype.
- **Accessible**: semantic HTML, labelled fields, live regions, keyboard navigation with visible
  focus, a native `<dialog>` modal and text contrast checked against WCAG.
- **Tested**: unit tests written as Gherkin scenarios, with a coverage report.
- **Typed**: strict TypeScript, no `any`.
- **Configurable**: all data and texts come from JSON files (`src/data`).
- **Clean architecture**: components, hooks, services and pure utility functions.

## Quick start

Requirements: Node.js 22 or later.

```bash
git clone https://github.com/mirelledesa/Budget.git
cd Budget/budget-app
npm install
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173).

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server. |
| `npm run build` | Type-checks and builds for production. |
| `npm run test -- --run` | Runs the unit tests once. |
| `npm run test:coverage` | Runs the tests and prints the coverage report. |

<details>
<summary><strong>Project structure</strong></summary>

```
budget-app/src
├── components/   presentational UI
├── constants/    named constants (no magic numbers)
├── data/         services.json and ca.json (all texts)
├── hooks/        state and logic (custom hooks)
├── pages/        route-level views
├── services/     data access (localStorage)
├── test/         unit tests (Gherkin scenarios)
├── types/        TypeScript interfaces
└── utils/        pure functions (calculation, validation, lists)
```

</details>

## Documentation

| Document | What you will find |
|---|---|
| [Backlog](docs/backlog.md) | User stories and acceptance criteria |
| [Kanban](docs/kanban.md) | Board columns, cards and definition of done |
| [User flow](docs/user-flow.md) and [journey](docs/user-journey.md) | How people move through the app |
| [Calculation logic](docs/calculation-logic.md) | How the total is computed |
| [Architecture](docs/architecture.md) | Layers, folders, routes and stack |
| [UX/UI improvements](docs/ux-improvements.md) | What was added and what is next |
| [Demo script](docs/demo-script.md) | A 5-minute presentation outline |

## Workflow

Git Flow: one `feature/*` branch per feature, merged into `develop` through Pull Requests after
validation, and `develop` merged into `main` for the release. Commits follow semantic messages
(`feat:`, `fix:`, `chore:`).

## Good to know, and what is next

Quotes are stored in the browser (`localStorage`), so a quote link opens in the browser where it was
created. A backend would make links work anywhere.

**Roadmap:** backend and database, PDF export, copy-link button, close button in the modal.

## Author

Made by **Mirelle** · [@mirelledesa](https://github.com/mirelledesa) · IT Academy Barcelona Activa