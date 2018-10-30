import React from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { GenerateMenu } from 'util/helpers/Menu';

const Navigation = props => {
  const {
    routes,
    authenticated,
    user,
    history,
    logoutAction,
  } = props;
  console.log(history);
  return (
    <GenerateMenu routes={routes} history={history}>
      <Menu.Menu position="right">
        {authenticated === true && ([
          <Menu.Item
            key="profile_link"
            name={`${user.firstName} ${user.lastName}`}
            active={history.location.pathname.startsWith('/profile')}
            onClick={() => history.push('/profile')}
          />,
          <Menu.Item
            key="logout_link"
            name="logout"
            onClick={() => history.push('/')}
          />
        ])}
        {authenticated === false && ([
          <Menu.Item
            key="login_link"
            name="Log In"
            active={history.location.pathname.startsWith('/login')}
            onClick={() => history.push('/login')}
          />
        ])}
      </Menu.Menu>
    </GenerateMenu>
  )
};

Navigation.defaultProps = {
  authenticated: false,
  user: {
    firstName: 'Justin',
    lastName: 'Tangas',
  },
  logoutAction: () => history.push('/login'),
};

export default withRouter(Navigation);
