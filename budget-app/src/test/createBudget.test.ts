import { describe, it, expect } from 'vitest';
import servicesData from '../data/services.json';
import type { ClientData, ServiceId, ServicesConfig, WebConfig } from '../types/budget';
import { createBudget } from '../utils/createBudget';

const config = servicesData as ServicesConfig;
const CLIENT: ClientData = {
  fullName: 'Ona Costa',
  phone: '666 666 666',
  email: 'ona.costa@gmail.com',
};
const FIXED_ID = 'budget-123';
const FIXED_DATE = new Date('2026-10-30T10:00:00.000Z');
const DEFAULT_WEB_CONFIG: WebConfig = { pages: 1, languages: 1 };

const build = (selectedServices: ServiceId[], webConfig: WebConfig = DEFAULT_WEB_CONFIG) =>
  createBudget({ client: CLIENT, selectedServices, webConfig, config }, FIXED_ID, FIXED_DATE);

describe('Feature: Budget creation', () => {
  it('Scenario: budget gets the given id and an ISO date', () => {
    const budget = build(['seo']);

    expect(budget.id).toBe(FIXED_ID);
    expect(budget.createdAt).toBe('2026-10-30T10:00:00.000Z');
  });

  it('Scenario: budget keeps the client data', () => {
    expect(build(['seo']).client).toEqual(CLIENT);
  });

  it('Scenario: Web (4 pages, 2 languages) + SEO -> 2 lines and total 980', () => {
    const budget = build(['web', 'seo'], { pages: 4, languages: 2 });

    expect(budget.lines).toHaveLength(2);
    expect(budget.total).toBe(980);
  });

  it('Scenario: web configuration is kept only when Web is selected', () => {
    expect(build(['seo'], { pages: 10, languages: 10 }).webConfig).toBeUndefined();
    expect(build(['web'], { pages: 4, languages: 2 }).webConfig).toEqual({ pages: 4, languages: 2 });
  });
});