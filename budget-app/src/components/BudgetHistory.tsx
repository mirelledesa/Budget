import texts from '../data/ca.json';
import type { Budget } from '../types/budget';
import type { SortKey } from '../utils/budgetList';
import { BudgetCard } from './BudgetCard';
import { TextField } from './TextField';

interface SortOption {
  key: SortKey;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { key: 'date', label: texts.history.sort.date },
  { key: 'amount', label: texts.history.sort.amount },
  { key: 'name', label: texts.history.sort.name },
];

const SORT_BUTTON_CLASS =
  'rounded-md px-2 py-1 hover:bg-gray-100 focus:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-brand-strong';

interface BudgetHistoryProps {
  budgets: Budget[];
  hasBudgets: boolean;
  query: string;
  sortKey: SortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (sortKey: SortKey) => void;
}

export const BudgetHistory = ({
  budgets,
  hasBudgets,
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: BudgetHistoryProps) => (
  <section
    aria-labelledby="history-title"
    className="mt-10 border-t border-dashed border-gray-300 pt-10"
  >
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h2 id="history-title" className="text-lg font-bold">
        {texts.history.title}
      </h2>

      {hasBudgets && (
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <TextField
            name="search"
            label={texts.history.searchLabel}
            placeholder={texts.history.searchPlaceholder}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          <div role="group" aria-label={texts.history.sortLabel} className="flex gap-2 text-xs">
            {SORT_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                aria-pressed={sortKey === key}
                onClick={() => onSortChange(key)}
                className={`${SORT_BUTTON_CLASS} ${
                  sortKey === key ? 'font-extrabold' : 'font-medium text-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

    {!hasBudgets && <p className="mt-4 text-xs text-gray-600">{texts.history.empty}</p>}

    {hasBudgets && budgets.length === 0 && (
      <p role="status" className="mt-4 text-xs text-gray-600">
        {texts.history.noResults}
      </p>
    )}

    <ul className="mt-6 space-y-5">
      {budgets.map((budget) => (
        <li key={budget.id}>
          <BudgetCard budget={budget} />
        </li>
      ))}
    </ul>
  </section>
);