<div align="center">

# 📊 Budget App · Frontender · IT Academy

  <p><strong>A single-page web app to build and share instant quotes for digital services (SEO, Ads, and Web).</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19">
    <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-Mobile_First-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Vitest-Testing-6E9F18?style=flat-square&logo=vitest&logoColor=white" alt="Vitest">
  </p>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-how-to-use">How to Use</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-accessibility">Accessibility</a>
  </p>

</div>

---

## 👁️ Preview

> *A client picks services, customizes the Web service, enters contact details, and gets an itemized quote with its own unique URL.*

![Budget App preview](docs/preview.png)

---

## ✨ Features

| Feature | Description |
| :--- | :--- |
| **Dynamic total** | Select SEO, Ads and/or Web and see the total update instantly. |
| **Web configurator** | Pages and languages: `(pages + languages) × 30 € + 500 €`. |
| **Client form** | Name, phone and email with validation and clear error messages. |
| **Quote creation** | Unique ID, date, itemized costs and total in a single view. |
| **History** | List of saved quotes with search by name and sorting by date, amount or name. |
| **Unique URL** | Every quote has its own page at `/budget/:id`. |

---

## 🛠️ Tech Stack

* **React 19 + TypeScript** (strict, no `any`)
* **Tailwind CSS** (mobile-first, `md:` breakpoint)
* **React Router**
* **Zod** (form validation)
* **Vitest + Testing Library** (unit tests written as Gherkin scenarios)
* **Data and texts configurable via JSON** (`src/data`)
* **Persistence:** `localStorage` (MVP)

---

## 🚀 Getting Started

* **Requirements:** Node.js 22 or later.

```bash
git clone [https://github.com/mirelledesa/Budget.git](https://github.com/mirelledesa/Budget.git)
cd Budget/budget-app
npm install
npm run dev