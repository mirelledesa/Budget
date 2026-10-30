import { Link, useParams } from 'react-router-dom';
import { BudgetSummary } from '../components/BudgetSummary';
import { ROUTES } from '../constants/routes';
import texts from '../data/ca.json';
import { findBudgetById } from '../services/budgetStorage';

export const BudgetDetailPage = () => {
  const { id } = useParams();
  const budget = id ? findBudgetById(id) : undefined;

  return (
    <main>
      <h1 className="sr-only">{texts.detail.title}</h1>

      {budget ? (
        <BudgetSummary budget={budget} />
      ) : (
        <section
          aria-labelledby="not-found-title"
          className="rounded-2xl bg-white p-6 shadow-md"
        >
          <h2 id="not-found-title" className="text-lg font-bold">
            {texts.detail.notFoundTitle}
          </h2>
          <p className="mt-2 text-xs">{texts.detail.notFoundText}</p>
          <Link
            to={ROUTES.home}
            className="mt-4 inline-block rounded text-xs font-bold underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong"
          >
            {texts.detail.backHome}
          </Link>
        </section>
      )}
    </main>
  );
};
