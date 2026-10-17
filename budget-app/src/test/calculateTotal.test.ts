import { describe, it, expect } from 'vitest';
import { calculateTotal } from '../utils/calculateTotal';
import servicesData from '../data/services.json';
import type { ServicesConfig, WebConfig } from '../types/budget';

const config = servicesData as ServicesConfig;
const DEFAULT_WEB_CONFIG: WebConfig = { pages: 1, languages: 1 };
describe('Feature: Service selection', () => {
    it ('Scenario: no seleted -> total is 0', () => {
        expect(calculateTotal([], DEFAULT_WEB_CONFIG, config)).toBe(0);
  });
  it('Scenario: one service selected -> SEO is 300', () => {
    expect(calculateTotal(['seo'], DEFAULT_WEB_CONFIG, config)).toBe(300);
  });

  it('Scenario: several services selected -> SEO + Ads is 700', () => {
    expect(calculateTotal(['seo', 'ads'], DEFAULT_WEB_CONFIG, config)).toBe(700);
  });
});
describe('Feature: Web service configuration', () => {
  it('Scenario: 1 page and 3 languages -> 620', () => {
    expect(calculateTotal(['web'], { pages: 1, languages: 3 }, config)).toBe(620);
  });

  it('Scenario: Web (4 pages, 2 languages) + SEO -> 980', () => {
    expect(calculateTotal(['web', 'seo'], { pages: 4, languages: 2 }, config)).toBe(980);
  });

  it('Scenario: web config is ignored when Web is not selected', () => {
    expect(calculateTotal(['seo'], { pages: 10, languages: 10 }, config)).toBe(300);
  });
});