import { WEB_SERVICE_ID } from '../constants/money';
import texts from '../data/ca.json';
import type { Budget } from '../types/budget';
import { describeWeb } from '../utils/describeWeb';
import { Price } from './Price';
import { Link } from 'react-router-dom';
import { getBudgetPath } from '../constants/routes';
interface BudgetCardProps {
  budget: Budget;
}

export const BudgetCard = ({ budget }: BudgetCardProps) => {
  const { client, lines, webConfig, total } = budget;

  return (
    <article className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-md md:flex-row md:items-start md:justify-between">
      <div>
        <h3 className="text-lg font-bold">
           <Link
      to={getBudgetPath(budget.id)}
      className="rounded hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong"
      >
      {client.fullName}
      </Link>
        </h3>
        <p className="text-xs text-gray-600">{client.email}</p>
        <p className="text-xs text-gray-600">{client.phone}</p>
      </div>

      <div>
        <p className="text-xs font-bold">{texts.summary.services}</p>
        <ul className="mt-1 list-disc pl-4 text-xs">
          {lines.map((line) => (
            <li key={line.serviceId}>
              {line.name}
              {line.serviceId === WEB_SERVICE_ID && webConfig && ` (${describeWeb(webConfig)})`}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-baseline gap-2 md:flex-col md:items-end md:gap-0">
        <span className="text-sm font-bold text-gray-600">{texts.summary.total}</span>
        <Price amount={total} />
      </div>
    </article>
  );
};