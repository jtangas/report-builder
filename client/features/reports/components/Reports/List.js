import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button } from 'semantic-ui-react';

import { loadReportsAction } from 'features/reports/actions/reports';

const mapDispatchToProps = {
  loadReports: loadReportsAction,
};

const mapStateToProps = state => ({
  reports: state.reports.list,
  fetched: state.reports.fetched,
});

export default connect(mapStateToProps, mapDispatchToProps)(props => {
  const { reports, loadReports, fetched } = props;

  if (!fetched && reports.length === 0) {
    loadReports();
  }

  return (
    <Segment basic style={{ padding: '10px' }}>
      {reports.length === 0 && (<div>
        <p>No Reports Found</p>
        <Button onClick={() => loadReports()}>
          Load Reports
        </Button>
      </div>)}
      {reports.length > 0 && (
        reports.map(report => (
          <div>
            <p>{report.name}</p>
          </div>
        ))
      )}
    </Segment>
  )
});
