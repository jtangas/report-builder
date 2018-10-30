import React from 'react';
import { Segment } from 'semantic-ui-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { fullRoutes, appRoutes } from 'core/routes';
import Navigation from 'features/navigation/components/Navigation/Navigation';

export default props => (
  <BrowserRouter>
    <div className="App">
      <Segment inverted vertical style={{ padding: 0, border: 0, boxShadow: 'none' }}>
        <Navigation routes={appRoutes} />
      </Segment>
      <Segment
        style={{
          padding: 0,
          border: 'none',
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          marginTop: 0,
        }}
      >
        <Switch>
          {
            fullRoutes.map(route => {
              const { component: Component } = route;
              return (
                <Route
                  exact={route.exact}
                  path={route.path}
                  key={`route_${route.name}`}
                  render={props => <Component {...props} {...route.props} />}
                />
              )
            })
          }
        </Switch>
      </Segment>
    </div>
  </BrowserRouter>
);