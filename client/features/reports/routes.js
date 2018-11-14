import Page from 'features/app/containers/PageContainer';
import ManageReports from 'features/reports/containers/ManageReports';

const ReportRoutes = [
  {
    path: '/reports/view',
    group: 'Report Actions',
    name: 'View Reports',
  },
  {
    path: '/reports/create',
    group: 'Report Actions',
    name: 'Create New Report',
  },
  {
    path: '/reports/pending',
    group: 'Report Actions',
    name: 'Reports Pending Review',
  },
];

export default [
  {
    path: '/reports/:action?/:reportId?',
    name: 'reports',
    requiresAuth: true,
    component: Page,
    exact: false,
    inMenu: true,
    withSideNav: true,
    render: ManageReports,
    sideNavProps: {
      routes: ReportRoutes,
    },
  },
];