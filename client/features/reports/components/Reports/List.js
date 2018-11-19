import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Button, Table } from 'semantic-ui-react';

import { loadReportsAction } from 'features/reports/actions/reports';
import TableHeaders from 'features/reports/components/Form/definitions/TableHeaders';

const mapDispatchToProps = {
  loadReports: loadReportsAction,
};

const mapStateToProps = state => ({
  reports: state.reports.list,
  fetched: state.reports.fetched,
});

const extractValue = value => {
  let valueIsBool = (typeof value === typeof true);
  switch (true) {
    case (valueIsBool && value):
      return "Approved";
    case (valueIsBool && !value):
    case (!valueIsBool && value === undefined):
      return "Denied";
    default:
      return value;
  }
};

const GenerateRows = props => {
  const { data, history } = props;
  return (
    data.map(report => (
      <Table.Row key={`row_${report.name}`}>
        {
          TableHeaders.map(column => {
            if (report.hasOwnProperty(column.name)) {
              return <Table.Cell key={`data_${report._id}_${column.name}`}>{extractValue(report[column.name])}</Table.Cell>;
            }

            return <Table.Cell key={`data_${report._id}_${column.name}`}>{column.default}</Table.Cell>;
          })
        }
        <Table.Cell key={`actions_${report._id}`}>
          <Button onClick={() => history.push(`/reports/edit/${report._id}`)}>Edit</Button>
          <Button onClick={() => console.log(report._id)}>Delete</Button>
        </Table.Cell>
      </Table.Row>
    ))
  );
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(props => {
  const { reports, loadReports, fetched, history } = props;

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
        <Table striped>
          <Table.Header>
            <Table.Row>
              {TableHeaders.map(header => (
                <Table.HeaderCell>{header.display}</Table.HeaderCell>
              ))}
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
            <GenerateRows history={history} data={reports} />
          </Table.Header>
        </Table>
      )}
    </Segment>
  )
}));
