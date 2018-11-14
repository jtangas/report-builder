import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import CreateReportTemplate from 'features/form/templates/FullWidthForm';

import {
  Values,
  Validation,
  Fields
} from 'features/reports/components/Form/definitions/CreateReport';

export default connect((state => ({ reports: state.reports.list })), null)(props => {
  const {
    handleSubmit,
    render: UserComponent,
    reportId,
    reports,
  } = props;

  const report = reports.find(report => report._id === reportId);
  const Template = UserComponent || CreateReportTemplate;
  const initialValues = report || Values;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Validation}
      render={formikProps => {
        return (
          <Template formFields={Fields} {...formikProps} />
        )
      }}
    />
  )
});
