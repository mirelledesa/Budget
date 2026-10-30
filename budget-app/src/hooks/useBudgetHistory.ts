import { useMemo, useState } from 'react';
import { loadBudgets } from '../services/budgetStorage';
import type { Budget } from '../types/budget';
import { filterByName, sortBudgets, type SortKey } from '../utils/budgetList';

export const useBudgetHistory = () => {
  const [budgets, setBudgets] = useState<Budget[]>(loadBudgets);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');

  const visibleBudgets = useMemo(
    () => sortBudgets(filterByName(budgets, query), sortKey),
    [budgets, query, sortKey],
  );

  const refresh = () => setBudgets(loadBudgets());

  return {
    visibleBudgets,
    hasBudgets: budgets.length > 0,
    query,
    setQuery,
    sortKey,
    setSortKey,
    refresh,
  };
};