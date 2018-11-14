import Login from 'features/auth/components/Login/Login';
import Page from 'features/app/containers/PageContainer';

export default [
  {
    path: '/',
    component: Page,
    name: 'Login',
    exact: true,
    render: Login,
  },
];
