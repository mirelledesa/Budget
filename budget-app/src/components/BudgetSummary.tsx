import { DISPLAY_LOCALE } from '../constants/app';
import { CURRENCY_SYMBOL, WEB_SERVICE_ID } from '../constants/money';
import texts from '../data/ca.json';
import type { Budget, ClientData, WebConfig } from '../types/budget';
import { getLineTotal } from '../utils/budgetLines';
import { Price } from './Price';

interface BudgetSummaryProps {
  budget: Budget;
}

const CLIENT_FIELDS: (keyof ClientData)[] = ['fullName', 'phone', 'email'];

const dateFormatter = new Intl.DateTimeFormat(DISPLAY_LOCALE, {
  dateStyle: 'long',
  timeStyle: 'short',
});

const describeWeb = ({ pages, languages }: WebConfig) =>
  `${pages} ${texts.summary.pages}, ${languages} ${texts.summary.languages}`;

export const BudgetSummary = ({ budget }: BudgetSummaryProps) => {
  const { id, createdAt, client, lines, webConfig, total } = budget;
  const titleId = `budget-title-${id}`;

  return (
    <article aria-labelledby={titleId} className="rounded-2xl bg-white p-6 shadow-md">
      <header className="flex items-baseline justify-between gap-4">
        <h2 id={titleId} className="text-lg font-bold">
          {texts.summary.title}
        </h2>
        <time dateTime={createdAt} className="text-xs font-semibold text-gray-600">
          {dateFormatter.format(new Date(createdAt))}
        </time>
      </header>

      <dl className="mt-4 space-y-1 text-xs">
        {CLIENT_FIELDS.map((field) => (
          <div key={field} className="flex gap-2">
            <dt className="font-bold">{texts.form.fields[field].label}:</dt>
            <dd>{client[field]}</dd>
          </div>
        ))}
      </dl>

      <h3 className="mt-6 text-sm font-bold">{texts.summary.services}</h3>
      <ul className="mt-1 divide-y divide-gray-200">
        {lines.map((line) => (
          <li key={line.serviceId} className="flex items-start justify-between gap-4 py-3">
            <div>
              <p className="text-sm font-bold">
                {line.name}
                {line.serviceId === WEB_SERVICE_ID && webConfig && ` (${describeWeb(webConfig)})`}
              </p>
              {line.customizationCost > 0 && (
                <p className="mt-1 text-xs text-gray-600">
                  {texts.summary.basePrice} {line.basePrice}{CURRENCY_SYMBOL} + {texts.summary.customization} {line.customizationCost}{CURRENCY_SYMBOL}
                </p>
              )}
            </div>
            <Price amount={getLineTotal(line)} size="sm" />
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-baseline justify-end gap-6 border-t border-gray-200 pt-4">
        <span className="text-lg font-bold">{texts.summary.total}</span>
        <Price amount={total} size="lg" />
      </div>
    </article>
  );
};