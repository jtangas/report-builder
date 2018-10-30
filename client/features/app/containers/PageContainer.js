import React from 'react';
import { connect } from 'react-redux'

import Page from 'features/app/components/Page/Page';

const mapStateToProps = state => ({
  authenticated: state.auth.loggedIn,
});

export default connect(mapStateToProps, null)(Page);