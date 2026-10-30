import { BUDGETS_STORAGE_KEY } from '../constants/app';
import type { Budget } from '../types/budget';

export const loadBudgets = (): Budget[] => {
  try {
    const rawBudgets = localStorage.getItem(BUDGETS_STORAGE_KEY);
    return rawBudgets ? (JSON.parse(rawBudgets) as Budget[]) : [];
  } catch {
    return [];
  }
};

export const saveBudget = (budget: Budget): boolean => {
  try {
    const budgets = loadBudgets();
    localStorage.setItem(BUDGETS_STORAGE_KEY, JSON.stringify([budget, ...budgets]));
    return true;
  } catch {
    return false;
  }
};
export const findBudgetById = (id: string): Budget | undefined =>
    loadBudgets().find((budget) => budget.id === id);