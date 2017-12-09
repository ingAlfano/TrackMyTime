import * as React from 'react';
import { Activity } from './components/Activity/Activity';
import { Create } from './components/Activity/Create';
import { Route, Switch } from 'react-router-dom';
export class RoutePaths {
}
RoutePaths.Activities = "/";
RoutePaths.ActivityNew = "/new";
export const routes = React.createElement(Switch, null,
    React.createElement(Route, { exact: true, path: RoutePaths.Activities, component: Activity }),
    React.createElement(Route, { path: RoutePaths.ActivityNew, component: Create }));
//# sourceMappingURL=routes.js.map