import { useState } from 'react';
import { BudgetSummary } from '../components/BudgetSummary';
import { ClientForm } from '../components/ClientForm';
import { InfoModal } from '../components/InfoModal';
import { Price } from '../components/Price';
import { ServiceCard } from '../components/ServiceCard';
import { Stepper } from '../components/Stepper';
import { CURRENCY_SYMBOL } from '../constants/money';
import texts from '../data/ca.json';
import { useBudgetCalculator } from '../hooks/useBudgetCalculator';
import { saveBudget } from '../services/budgetStorage';
import type { Budget, ClientData, WebConfig } from '../types/budget';

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
    buildBudget,
  } = useBudgetCalculator();

  const [openInfo, setOpenInfo] = useState<keyof WebConfig | null>(null);
  const [createdBudget, setCreatedBudget] = useState<Budget | null>(null);
  const modalTexts = openInfo ? texts.web.info[openInfo] : null;

  const buildInfo = (field: keyof WebConfig) => ({
    label: `${texts.web.infoButton} ${texts.web.info[field].title}`,
    onOpen: () => setOpenInfo(field),
  });

  const handleClientSubmit = (client: ClientData): boolean => {
    const budget = buildBudget(client);
    const wasSaved = saveBudget(budget);

    if (wasSaved) {
      setCreatedBudget(budget);
    }

    return wasSaved;
  };

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
                      onChange={(direction) => changeWebConfig('pages', direction)}
                      info={buildInfo('pages')}
                    />
                    <Stepper
                      label={texts.web.languagesLabel}
                      value={webConfig.languages}
                      min={minValues.languages}
                      onChange={(direction) => changeWebConfig('languages', direction)}
                      info={buildInfo('languages')}
                    />
                  </>
                )}
              </ServiceCard>
            </li>
          ))}
        </ul>

        <div role="status" className="mt-8 flex items-baseline justify-end gap-6">
          <span className="text-lg font-bold">{texts.total.label}</span>
          <Price amount={total} size="lg" />
        </div>

        <div className="mt-10">
          <ClientForm
            hasSelectedServices={selectedServices.length > 0}
            onSubmit={handleClientSubmit}
          />
        </div>

        {createdBudget && (
          <div className="mt-10">
            <BudgetSummary budget={createdBudget} />
          </div>
        )}
      </main>

      {modalTexts && (
        <InfoModal title={modalTexts.title} onClose={() => setOpenInfo(null)}>
          <p>{modalTexts.description}</p>
          <p>
            {modalTexts.costLabel} {costPerUnit}{CURRENCY_SYMBOL}
          </p>
        </InfoModal>
      )}
    </div>
  );
};