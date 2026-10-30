import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ROUTES } from './constants/routes';
import { BudgetDetailPage } from './pages/BudgetDetailPage';
import { BudgetPage } from './pages/BudgetPage';

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path={ROUTES.home} element={<BudgetPage />} />
      <Route path={ROUTES.budgetDetail} element={<BudgetDetailPage />} />
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Route>
  </Routes>
);

export default App;