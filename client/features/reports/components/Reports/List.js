import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button } from 'semantic-ui-react';

import { loadReportsAction } from 'features/reports/actions/reports';

const mapDispatchToProps = {
  loadReports: loadReportsAction,
};

const mapStateToProps = state => ({
  reports: state.reports.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(props => {
  const { reports, loadReports } = props;
  return (
    <Segment basic style={{ padding: '10px' }}>
      {reports.length === 0 && (<div>
        <p>No Reports Found</p>
        <Button onClick={() => loadReports()}>
          Load Reports
        </Button>
      </div>)}
      {reports.length > 0 && <p>Reports Found</p>}
    </Segment>
  )
});
