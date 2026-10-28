import { useState } from "react";
import { InfoModal } from "../components/InfoModal";
import { Price } from "../components/Price";
import { ServiceCard } from "../components/ServiceCard";
import { Stepper } from "../components/Stepper";
import { CURRENCY_SYMBOL } from "../constants/money";
import texts from "../data/ca.json";
import { useBudgetCalculator } from "../hooks/useBudgetCalculator";
import type { webConfig } from "../types/budget";

export const BudgetPage = () => {
  const {
    services,
    minValues,
    costPerUnit,
    selectedServices,
    webConfig,
    total,
    toggleService,
    changeWebConfig,
  } = useBudgetCalculator();

  const [openInfo, setOpenInfo] = useState<keyof webConfig | null>(null);
  const modalTexts = openInfo ? texts.web[openInfo] : null;

  const buildInfo = (field: keyof webConfig) => ({
    label: `${texts.web.infoButton} ${texts.web.info[field].title}`,
    onOpen: () => setOpenInfo(field),
  });
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16">
      <header className="py-6 text-sm font-bold">{texts.header.brand}</header>

      <main>
        <section
          aria-labelledby="hero-title"
          className="rounded-3xl bg-stone-100 bg-[url('/banner.svg')] bg-cover bg-center px-6 py-14 text-center md:py-20"
        >
          <h1 id="hero-title" className="text-3xl font-extrabold md:text-4xl">
            {texts.hero.title}
          </h1>
        </section>
        <ul className="mt-10 space-y-5">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard
                service={service}
                isSelected={selectedServices.includes(service.id)}
                onToggle={toggleService}
              >
                {service.configurable && (
                  <>
                    <Stepper
                      label={texts.web.pagesLabel}
                      value={webConfig.pages}
                      min={minValues.pages}
                      onChange={(direction) =>
                        changeWebConfig("pages", direction)
                      }
                    />
                    <Stepper
                      label={texts.web.languagesLabel}
                      value={webConfig.languages}
                      min={minValues.languages}
                      onChange={(direction) =>
                        changeWebConfig("languages", direction)
                      }
                    />
                  </>
                )}
              </ServiceCard>
            </li>
          ))}
        </ul>
        <div
          role="status"
          className="mt-8 flex items-baseline justify-end gap-6">
          <span className="text-lg font-bold">{texts.total.label}</span>
          <Price amount={total} size="lg" />
        </div>
      </main>

      {ModalTexts && (
        infoModal title ={modalTexts.title} onClose={() => setOpenInfo(null)}>
        <p>{modalText.description}</p>
        <p>
          {modalTexts.cost} {CURRENCY_SYMBOL}
        </p>
    </div>
  );
};
