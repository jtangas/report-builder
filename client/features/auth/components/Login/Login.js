import React from 'react';
// import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginAction } from 'features/auth/actions/Login';
import LoginForm from 'features/form/components/Form/Login';

const Login = props => {
  const { history, login } = props;
  const handleSubmit = values => {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // login(data.user).then(() => {
        //  history.push('/dashboard');
        // });
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  )
};

export default withRouter(Login);