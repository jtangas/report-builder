import React from 'react';
import LoginFormTemplate from 'features/form/templates/LoginForm';
import { Formik } from 'formik';

import { Values, Validation, Fields } from 'features/form/definitions/Login';

export default props => {
  const { handleSubmit, render: UserTemplate } = props;

  const Template = UserTemplate || LoginFormTemplate;

  return (
    <Formik
      initialValues={Values}
      onSubmit={handleSubmit}
      validationSchema={Validation}
      render={props => <Template formFields={Fields} {...props} />}
    />
  )
};
