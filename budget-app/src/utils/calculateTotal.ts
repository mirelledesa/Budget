import type { ServiceId, ServicesConfig, WebConfig } from '../types/budget';

const WEB_SERVICE_ID: ServiceId = 'web';

export const calculateTotal = (
  selectedServices: ServiceId[],
  webConfig: WebConfig,
  config: ServicesConfig,
): number => {
  const { costPerUnit } = config.webConfig;

  return selectedServices.reduce((total, serviceId) => {
    const service = config.services.find((item) => item.id === serviceId);
    if (!service) return total;

    if (serviceId === WEB_SERVICE_ID) {
      const customizationCost = (webConfig.pages + webConfig.languages) * costPerUnit;
      return total + service.price + customizationCost;
    }

    return total + service.price;
  }, 0);
};