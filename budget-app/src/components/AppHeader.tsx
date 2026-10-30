import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import texts from '../data/ca.json';

export const AppHeader = () => (
  <header className="py-6 text-sm font-bold">
    <Link
      to={ROUTES.home}
      className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong"
    >
      {texts.header.brand}
    </Link>
  </header>
);