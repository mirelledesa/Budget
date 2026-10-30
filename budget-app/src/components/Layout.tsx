import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';

export const Layout = () => (
  <div className="mx-auto max-w-3xl px-4 pb-16">
    <AppHeader />
    <Outlet />
  </div>
);