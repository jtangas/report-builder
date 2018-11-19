import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { HashLink } from 'react-router-hash-link';

export const GenerateMenuItem = props => {
  const { route, history } = props;
  const propsToUse = {
    name: route.name,
    path: route.path,
    active: (route.path !== '/' && history.location.pathname.startsWith(route.path)) || (route.path === '/' && history.location.pathname === '/'),
    onClick: () => history.push(route.path),
  };

  if (route.hashLink === true) {
    propsToUse.as = HashLink;
    propsToUse.to = route.path;
  }

  return (
    <Menu.Item {...propsToUse} />
  );
};

export const GenerateGroups = props => {
  const { routes, group, history } = props;
  const routesForGroup = routes.filter(route => route.group === group);
  return (
    <Menu.Item>
      <Menu.Header>{ group }</Menu.Header>
      {
        routesForGroup.length > 0 && (
          <Menu.Menu>
            {routesForGroup.map(route => (
              <GenerateMenuItem
                key={`route_group_menu_${route.name}`}
                route={route}
                history={history}
              />
            ))}
          </Menu.Menu>
        )
      }
    </Menu.Item>
  )
};

export const GenerateMenu = props => {
  const {routes, history, authenticated, children} = props;
  const routesToDisplay = routes.filter(route => (
    ((route.requiresAuth && authenticated === true)
    || (!route.requiresAuth)) && route.inMenu
  ));

  return (
    <Segment inverted style={{ border: 0, boxShadow: 'none' }}>
      <Menu pointing secondary stackable inverted>
        {
          routesToDisplay.map(route => (
            <GenerateMenuItem
              key={`main_menu_route_${route.name}`}
              route={route}
              history={history}
            />
          ))
        }
        {children}
      </Menu>
    </Segment>
  )
};
