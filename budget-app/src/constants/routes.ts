export const ROUTES = {
  home: '/',
  budgetDetail: '/budget/:id',
} as const;

export const getBudgetPath = (id: string): string => `/budget/${id}`;