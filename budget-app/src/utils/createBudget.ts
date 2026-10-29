import { WEB_SERVICE_ID } from '../constants/money';
import type { Budget, ClientData, ServiceId, ServicesConfig, WebConfig } from '../types/budget';
import { buildBudgetLines, sumLines } from './budgetLines';

interface CreateBudgetInput {
  client: ClientData;
  selectedServices: ServiceId[];
  webConfig: WebConfig;
  config: ServicesConfig;
}

export const createBudget = (
  { client, selectedServices, webConfig, config }: CreateBudgetInput,
  id: string = crypto.randomUUID(),
  now: Date = new Date(),
): Budget => {
  const lines = buildBudgetLines(selectedServices, webConfig, config);
  const includesWeb = selectedServices.includes(WEB_SERVICE_ID);

  return {
    id,
    createdAt: now.toISOString(),
    client,
    lines,
    webConfig: includesWeb ? webConfig : undefined,
    total: sumLines(lines),
  };
};