import * as React from 'react';
import { Activity } from './components/Activity/Activity';
import { Create} from './components/Activity/Create';
import { Route, Redirect, Switch } from 'react-router-dom';

export class RoutePaths {
    public static Activities: string = "/";
    public static ActivityNew: string = "/new";
}

export const routes = <Switch>
            <Route exact path={RoutePaths.Activities} component={Activity} />
            <Route path={RoutePaths.ActivityNew} component={Create} />
        </Switch>