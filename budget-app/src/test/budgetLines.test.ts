import { describe, it, expect } from 'vitest';
import servicesData from '../data/services.json';
import type { ServicesConfig, WebConfig } from '../types/budget';
import { buildBudgetLines, sumLines } from '../utils/budgetLines';

const config = servicesData as ServicesConfig;
const DEFAULT_WEB_CONFIG: WebConfig = { pages: 1, languages: 1 };

describe('Feature: Budget lines', () => {
  it('Scenario: no service selected -> no lines', () => {
    expect(buildBudgetLines([], DEFAULT_WEB_CONFIG, config)).toEqual([]);
  });

  it('Scenario: SEO line has base price and no customization', () => {
    expect(buildBudgetLines(['seo'], DEFAULT_WEB_CONFIG, config)).toEqual([
      { serviceId: 'seo', name: 'Seo', basePrice: 300, customizationCost: 0 },
    ]);
  });

  it('Scenario: Web line includes the customization cost', () => {
    const lines = buildBudgetLines(['web'], { pages: 4, languages: 2 }, config);

    expect(lines).toEqual([
      { serviceId: 'web', name: 'Web', basePrice: 500, customizationCost: 180 },
    ]);
  });

  it('Scenario: lines follow the selection order', () => {
    const lines = buildBudgetLines(['web', 'seo'], DEFAULT_WEB_CONFIG, config);

    expect(lines.map((line) => line.serviceId)).toEqual(['web', 'seo']);
  });

  it('Scenario: sum of lines adds base prices and customization', () => {
    const lines = buildBudgetLines(['web', 'seo'], { pages: 4, languages: 2 }, config);

    expect(sumLines(lines)).toBe(980);
  });
});