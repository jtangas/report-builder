import EditTokens from 'features/tokens/containers/EditTokensContainer';
import CreateTokens from 'features/tokens/containers/CreateTokensContainer';

import NotFound from 'features/app/containers/NotFound';
import Page from 'features/app/containers/PageContainer';

const TokenRoutes = [
  {
    path: '/tokens/edit',
    component: EditTokens,
    requiresAuth: true,
    group: 'Token Actions',
    exact: true,
    name: 'Edit Tokens',
  },
  {
    path: '/tokens/create',
    component: CreateTokens,
    group: 'Token Actions',
    requiresAuth: true,
    exact: true,
    name: 'Create Tokens',
  },
];

export default [
  {
    path: '/tokens',
    name: 'tokens',
    requiresAuth: true,
    component: Page,
    exact: false,
    props: {
      requiresAuth: true,
      withSideNav: true,
      routes: TokenRoutes,
      defaultComponent: NotFound,
    },
  },
];