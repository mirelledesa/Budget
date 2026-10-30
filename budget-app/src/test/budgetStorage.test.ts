import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { BUDGETS_STORAGE_KEY } from '../constants/app';
import servicesData from '../data/services.json';
import { loadBudgets, saveBudget } from '../services/budgetStorage';
import type { Budget, ServicesConfig } from '../types/budget';
import { createBudget } from '../utils/createBudget';

const config = servicesData as ServicesConfig;

const makeBudget = (id: string): Budget =>
  createBudget(
    {
      client: { fullName: 'Ona Costa', phone: '666 666 666', email: 'ona.costa@gmail.com' },
      selectedServices: ['seo'],
      webConfig: { pages: 1, languages: 1 },
      config,
    },
    id,
    new Date('2026-10-30T10:00:00.000Z'),
  );

describe('Feature: Budget storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Scenario: nothing saved -> empty list', () => {
    expect(loadBudgets()).toEqual([]);
  });

  it('Scenario: a saved budget can be loaded back', () => {
    const budget = makeBudget('a');

    expect(saveBudget(budget)).toBe(true);
    expect(loadBudgets()).toEqual([budget]);
  });

  it('Scenario: the newest budget comes first', () => {
    saveBudget(makeBudget('first'));
    saveBudget(makeBudget('second'));

    expect(loadBudgets().map((budget) => budget.id)).toEqual(['second', 'first']);
  });

  it('Scenario: corrupted storage -> empty list', () => {
    localStorage.setItem(BUDGETS_STORAGE_KEY, '{not valid json');

    expect(loadBudgets()).toEqual([]);
  });

  it('Scenario: storage failure -> saving returns false', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage is full');
    });

    expect(saveBudget(makeBudget('a'))).toBe(false);
  });
});