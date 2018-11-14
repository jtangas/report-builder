import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { createReportAction } from 'features/reports/actions/reports';
import ReportList from 'features/reports/components/Reports/List';
import CreateReport from 'features/reports/components/Form/CreateReport';
import ReportTemplate from 'features/reports/components/Form/templates/ReportTemplate';
import NotFound from 'features/app/containers/NotFound';

const mapDispatchToProps = {
  addNewReport: createReportAction,
};

export default withRouter(connect(null, mapDispatchToProps)(props => {
  const {
    history,
    match,
    addNewReport,
  } = props;

  const { reportId, action } = match.params;

  const handleUpdateSubmit = values => {
    console.log({
      method: 'update',
      values,
    });
  };

  const handleSubmit = values => {
    addNewReport(values);
  };

  if (reportId !== null && reportId !== false && action === 'edit' ) {
    return (
      <CreateReport
        reportId={reportId}
        render={ReportTemplate}
        handleSubmit={handleUpdateSubmit}
      />
    )
  }

  if (action === 'create') {
    return (
      <CreateReport
        render={ReportTemplate}
        handleSubmit={handleSubmit}
      />
    )
  }

  if (action === 'view' && !reportId) {
    return (
      <Container style={{ padding: '10px', flex: 1 }}>
        <ReportList/>
      </Container>
    )
  }

  return (
    <NotFound />
  )
}));
