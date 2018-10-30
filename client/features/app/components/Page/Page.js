import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import SideNav from 'features/navigation/components/Navigation/SideNav';

export default props => {
  const {
    routes,
    withSideNav,
    defaultComponent,
    requiresAuth,
    authenticated,
    sideNavProps,
    title,
  } = props;

  if (requiresAuth === true && authenticated === false) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
        { withSideNav === true && (
          <div style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
            <SideNav
              vertical
              {...sideNavProps}
              style={{
                borderRadius: 0,
                margin: 0,
                padding: 0,
              }}
              routes={routes}
            />
          </div>
        )}
        <Switch>
          {
            routes !== undefined &&
            routes.length > 0 &&
            routes.map(route => {
              console.log(route);
              const { component: Component } = route;
              return (
                <Route
                  key={`page_route_${route.name}`}
                  exact={route.exact}
                  path={route.path}
                  render={props => <Component {...props} title={title} />}
                />
              )
            })
          }
          <Route component={defaultComponent} />
        </Switch>
      </div>
    </div>
  )
};
