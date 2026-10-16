# Product Backlog

Format: *As a [role], I want [goal], so that [benefit]*.
Priority: **P1** = Level 1 (MVP core), **P2** = Level 2, **P3** = Level 3.

> **MVP scope:** bonus items (PDF export) are out of scope. Only the mandatory criteria are delivered.

---

## Epic 1: Custom Budget Creation (Level 1)

### US-01 Select services (P1)
As a client, I want to select SEO, Ads and/or Web, so that I can see the total price update in real time.

```gherkin
Feature: Service selection
  Scenario: No service selected
    Given no service is selected
    Then the total should be 0 €

  Scenario: One service selected
    When I select the "SEO" service
    Then the total should be 300 €

  Scenario: Several services selected
    When I select "SEO" and "Ads"
    Then the total should be 700 €

  Scenario: Deselecting a service
    Given "SEO" and "Ads" are selected
    When I deselect "Ads"
    Then the total should be 300 €
```

### US-02 Configure the Web service (P1)
As a client, I want to set the number of pages and languages of the Web service, so that the price matches my needs.
Formula: `(pages + languages) * 30 + 500`.

```gherkin
Feature: Web service configuration
  Scenario: Configurator hidden by default
    Given the "Web" service is not selected
    Then the pages and languages controls are not shown

  Scenario: Configurator shown when Web is selected
    When I select the "Web" service
    Then the pages and languages controls are shown with a minimum value of 1

  Scenario: Web price with custom configuration
    Given the "Web" service is selected
    When I set 1 page and 3 languages
    Then the web price should be 620 €

  Scenario: Minimum value is respected
    Given the "Web" service is selected with 1 page
    When I press the decrease button on pages
    Then the pages value should remain 1
```

### US-03 Informative modal (P1)
As a client, I want to open an info modal (ⓘ) next to pages and languages, so that I understand how much each extra costs.

```gherkin
Feature: Info modal
  Scenario: Open the modal
    Given the "Web" service is selected
    When I click the info icon next to languages
    Then a modal explains that each language costs 30 €

  Scenario: Close the modal with keyboard
    Given the info modal is open
    When I press the Escape key
    Then the modal is closed and the focus returns to the info icon
```

### US-04 Currency display (P1)
As a client, I want to see the € symbol next to every price, so that the amounts are clear.

```gherkin
Feature: Currency display
  Scenario: Prices show the euro symbol
    Then every service price, the estimated total and each history total are displayed followed by "€"
```

---

## Epic 2: Budget Generation (Level 1)

### US-05 Client form (P1)
As a client, I want to enter my name, phone and email, so that a budget is created for me.

```gherkin
Feature: Client form
  Scenario: Successful submission
    Given at least one service is selected
    And I fill in a valid name, phone and email
    When I press "Sol·licitar pressupost"
    Then a budget with a unique ID is created
    And I see all its details in a single view
```

### US-06 Form validation (P1)
As a client, I want clear error messages, so that I can fix my data easily.

```gherkin
Feature: Form validation
  Scenario: Empty required fields
    When I submit the form with empty fields
    Then each invalid field shows an error message linked with aria-describedby

  Scenario: Invalid email
    When I enter "joan@" as email
    Then I see an invalid email error

  Scenario: No service selected
    Given no service is selected
    When I submit the form
    Then I see a message asking me to select at least one service
```

### US-07 Action feedback (P1)
As a client, I want a confirmation after requesting a budget, so that I know it worked.

```gherkin
Feature: Feedback
  Scenario: Confirmation after creation
    When the budget is created
    Then I see a success message announced to screen readers (aria-live)
    And the form is reset
```

---

## Epic 3: Budget History (Level 2)

### US-08 List budgets (P2)
As a sales member, I want to see the list of generated budgets, so that I can review past requests.

```gherkin
Feature: Budget history
  Scenario: Budgets are persisted and listed
    Given I created a budget
    When I reload the page
    Then the budget is still listed with name, email, phone, services and total

  Scenario: Empty history
    Given there are no budgets
    Then I see a friendly empty-state message
```

### US-09 Search budgets (P2)
As a sales member, I want to search by name, so that I can find a budget quickly.

```gherkin
Feature: Search
  Scenario: Search by name
    Given the history has "Ona Costa" and "Joan Farrés"
    When I type "Joan" in the search field
    Then only "Joan Farrés" is listed

  Scenario: No results
    When I search for a name that does not exist
    Then I see a "no results" message
```

### US-10 Sort budgets (P2)
As a sales member, I want to sort by date, amount or name, so that I can organize the list.

```gherkin
Feature: Sorting
  Scenario: Sort by amount
    When I click "Import"
    Then budgets are ordered by total amount

  Scenario: Toggle direction
    When I click the active sort option again
    Then the order is reversed
```

---

## Epic 4: Budget Sharing (Level 3, without the PDF bonus)

### US-11 Unique URL (P3)
As a client, I want a unique URL for my budget, so that I can share it.

```gherkin
Feature: Unique URL
  Scenario: Open a budget by URL
    Given a budget exists with ID "abc123"
    When I visit "/budget/abc123"
    Then I see the budget detail page

  Scenario: Budget not found
    When I visit "/budget/unknown"
    Then I see a "budget not found" message with a link back home
```

### US-12 Detailed view (P3)
As a client, I want all information on the shared page, so that I have the full summary.

```gherkin
Feature: Budget detail
  Scenario: Detail content
    Given I open a valid budget URL
    Then I see the date, client details, selected services, itemized costs and total
```

---

## Technical and quality tasks

| ID | Task |
|----|------|
| T-01 | Project setup: Vite + React + TypeScript + Tailwind |
| T-02 | Folder structure and path aliases |
| T-03 | Define types and `services.json` / text JSON (SDD) |
| T-04 | Configure Vitest + Gherkin scenarios |
| T-05 | Router setup (`/` and `/budget/:id`) |
| T-06 | Reusable `formatCurrency` util and constants (no magic numbers) |
| T-07 | Error handling in storage service and error boundary |
| T-08 | Accessibility audit (keyboard, ARIA, contrast, focus) |
| T-09 | Minimal UX/UI improvements required by the criteria (info modal, empty states, success feedback, new detail view) |
| T-10 | README with preview, installation and usage guide |
| T-11 | Deploy to Netlify / Vercel / GitHub Pages |
| T-12 | Demo preparation (narrative, screens, technical vocabulary) |
