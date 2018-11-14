import React from 'react';
import { Route } from "react-router-dom";

import SideNav from 'features/navigation/components/Navigation/SideNav';

export default props => {
  const {
    withSideNav,
    render: RenderComponent,
    exact,
    path,
    sideNavProps,
    title,
    ...rest
  } = props;

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        { withSideNav === true && (
          <SideNav
            vertical
            inverted
            {...sideNavProps}
            style={{
              borderRadius: 0,
              margin: 0,
              padding: 0,
              height: '100%',
            }}
          />
        )}
        <Route path={path} exact={exact} render={props =>  <RenderComponent {...props} title={title} {...rest} />} />
      </div>
    </div>
  )
};
