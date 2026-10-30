# Architecture

Layered, component-based architecture following the Single Responsibility Principle.

```mermaid
flowchart LR
    subgraph UI [Pages and Components]
        P1[BudgetPage]
        P2[BudgetDetailPage]
        C1[ServiceCard]
        C2[Stepper]
        C3[InfoModal]
        C4[ClientForm]
        C5[BudgetCard]
        C6[BudgetSearchBar]
    end
    subgraph Logic [Custom Hooks]
        H1[useBudgetCalculator]
        H2[useBudgetHistory]
    end
    subgraph Services
        S1[budgetStorage - localStorage]
    end
    subgraph Data
        D1[services.json]
        D2[ca.json texts]
    end
    UI --> Logic
    Logic --> Services
    Logic --> Data
```

## Folder structure

```
src/
├── components/   # presentational UI
├── hooks/        # logic (custom hooks)
├── services/     # data access (storage)
├── utils/        # calculateTotal, formatCurrency
├── constants/    # named constants
├── data/         # services.json, ca.json
├── types/        # interfaces and types
├── pages/        # route-level views
└── tests/        # Gherkin features and specs
```

## Routes

| Path | View |
|------|------|
| `/` | Budget creation, form and history |
| `/budget/:id` | Shareable budget detail |


