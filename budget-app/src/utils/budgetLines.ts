import { WEB_SERVICE_ID } from '../constants/money';
import type { BudgetLine, ServiceId, ServicesConfig, WebConfig } from '../types/budget';

export const buildBudgetLines = (
  selectedServices: ServiceId[],
  webConfig: WebConfig,
  config: ServicesConfig,
): BudgetLine[] => {
  const { costPerUnit } = config.webConfig;

  return selectedServices.flatMap((serviceId): BudgetLine[] => {
    const service = config.services.find((item) => item.id === serviceId);
    if (!service) return [];

    const customizationCost =
      serviceId === WEB_SERVICE_ID ? (webConfig.pages + webConfig.languages) * costPerUnit : 0;

    return [{ serviceId, name: service.name, basePrice: service.price, customizationCost }];
  });
};

export const getLineTotal = (line: BudgetLine): number => line.basePrice + line.customizationCost;

export const sumLines = (lines: BudgetLine[]): number =>
  lines.reduce((total, line) => total + getLineTotal(line), 0);