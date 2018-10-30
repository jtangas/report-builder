import React from 'react';
import FullWidthTemplate from 'features/form/templates/FullWidthForm';
import { Formik } from 'formik';

import { Values, Validation, Fields } from 'features/form/definitions/CreateReportForm';

export default props => {
  const { handleSubmit, render: UserTemplate } = props;

  const Template = UserTemplate || FullWidthTemplate;

  return (
    <Formik
      initialValues={Values}
      onSubmit={handleSubmit}
      validationSchema={Validation}
      render={props => <Template formFields={Fields} {...props} />}
    />
  )
};
