import auth from 'features/auth/routes';
import app from 'features/app/routes';
import reports from 'features/reports/routes';
import tokens from 'features/tokens/routes';

const appRoutes = [
  ...auth,
  ...app,
  ...reports,
  ...tokens,
];

const fullRoutes = [
  ...auth,
  ...app,
  ...reports,
  ...tokens,
];

export {
  appRoutes,
  fullRoutes,
};
