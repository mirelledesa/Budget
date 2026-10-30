import type { Budget } from '../types/budget';

export type SortKey = 'date' | 'amount' | 'name';

const COMPARATORS: Record<SortKey, (a: Budget, b: Budget) => number> = {
  date: (a, b) => b.createdAt.localeCompare(a.createdAt),
  amount: (a, b) => b.total - a.total,
  name: (a, b) => a.client.fullName.localeCompare(b.client.fullName),
};

export const filterByName = (budgets: Budget[], query: string): Budget[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return budgets;
  }

  return budgets.filter((budget) =>
    budget.client.fullName.toLowerCase().includes(normalizedQuery),
  );
};

export const sortBudgets = (budgets: Budget[], sortKey: SortKey): Budget[] =>
  [...budgets].sort(COMPARATORS[sortKey]);