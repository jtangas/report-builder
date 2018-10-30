import React from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateReportForm from 'features/form/components/Form/CreateReport';
import { createReportAction } from 'features/reports/actions/reports';

const CreateReport = props => {
  const { currentUser, addNewReport } = props;

  return (
    <Container style={{ padding: '10px' }}>
      <CreateReportForm
        createdBy={currentUser.id}
        handleSubmit={values => {
          const newVals = {
            ...values,
            createdBy: currentUser.id,
          };

          addNewReport(newVals);
        }}
      />
    </Container>
  );
};

CreateReport.propTypes = {
  currentUser: PropTypes.number.isRequired,
  addNewReport: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addNewReport: createReportAction,
};

const mapStateToProps = state => ({
  currentUser: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateReport);
