import Page from 'features/app/containers/PageContainer';
import ViewReports from 'features/reports/containers/ViewReportsContainer';
import CreateReport from 'features/reports/containers/CreateReportContainer';
import NotFound from 'features/app/containers/NotFound';

const ReportRoutes = [
  {
    path: '/reports/view',
    component: ViewReports,
    group: 'Report Actions',
    exact: true,
    name: 'View Reports',
  },
  {
    path: '/reports/create',
    component: CreateReport,
    group: 'Report Actions',
    exact: true,
    name: 'Create New Report',
  },
  {
    path: '/reports/pending',
    component: ViewReports,
    group: 'Report Actions',
    exact: true,
    name: 'Reports Pending Review',
  },
];

export default [
  {
    path: '/reports',
    name: 'reports',
    requiresAuth: true,
    component: Page,
    exact: false,
    props: {
      requiresAuth: true,
      withSideNav: true,
      routes: ReportRoutes,
      defaultComponent: NotFound,
    },
  },
];