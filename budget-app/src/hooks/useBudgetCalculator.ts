import { useMemo, useState } from "react";
import { QUANTITY_STEP } from "../constants/money";
import servicesData from "../data/services.json";
import type {
  ServiceId,
  ServicesConfig,
  StepDirection,
  WebConfig,
} from "../types/budget";
import { calculateTotal } from "../utils/calculateTotal";

const config = servicesData as ServicesConfig;

const MIN_WEB_VALUES: WebConfig = {
  pages: config.webConfig.minPages,
  languages: config.webConfig.minLanguages,
};

export const useBudgetCalculator = () => {
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([]);
  const [webConfig, setWebConfig] = useState<WebConfig>(MIN_WEB_VALUES);

  const total = useMemo(
    () => calculateTotal(selectedServices, webConfig, config),
    [selectedServices, webConfig],
  );

  const toggleService = (serviceId: ServiceId) => {
    setSelectedServices((previous) =>
      previous.includes(serviceId)
        ? previous.filter((id) => id !== serviceId)
        : [...previous, serviceId],
    );
  };

  const changeWebConfig = (
    field: keyof WebConfig,
    direction: StepDirection,
  ) => {
    setWebConfig((previous) => ({
      ...previous,
      [field]: Math.max(
        MIN_WEB_VALUES[field],
        previous[field] + direction * QUANTITY_STEP,
      ),
    }));
  };

  return {
    services: config.services,
    minValues: MIN_WEB_VALUES,
    costPerUnit: config.webConfig.costPerUnit,
    selectedServices,
    webConfig,
    total,
    toggleService,
    changeWebConfig,
  };

};
