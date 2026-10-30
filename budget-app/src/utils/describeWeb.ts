import texts from '../data/ca.json';
import type { WebConfig } from '../types/budget';

export const describeWeb = ({ pages, languages }: WebConfig): string =>
  `${pages} ${texts.summary.pages}, ${languages} ${texts.summary.languages}`;