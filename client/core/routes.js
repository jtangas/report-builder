import auth from 'features/auth/routes';
import app from 'features/app/routes';
import reports from 'features/reports/routes';
import tokens from 'features/tokens/routes';

const fullRoutes = [
  ...auth,
  ...app,
  ...reports,
  ...tokens,
];

export {
  fullRoutes,
};
