import type { ServiceId, ServicesConfig, WebConfig } from '../types/budget';
import { buildBudgetLines, sumLines } from './budgetLines';

export const calculateTotal = (
  selectedServices: ServiceId[],
  webConfig: WebConfig,
  config: ServicesConfig,
): number => sumLines(buildBudgetLines(selectedServices, webConfig, config));