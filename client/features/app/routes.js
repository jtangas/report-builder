import Dashboard from 'features/app/containers/DashboardContainer';
export default [
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    requiresAuth: true,
  },
];