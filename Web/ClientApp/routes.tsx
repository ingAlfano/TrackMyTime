import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Activity } from './components/Activity/Activity';
import { Create } from './components/Activity/Create';
import { Edit } from './components/Activity/Edit';

export class RoutePaths {
    public static Activity: string = "/activity";
    public static ActivityEdit: string = "/activity/edit/:id";
    public static ActivityNew: string = "/activity/new";
}

export default class Routes extends React.Component<any, any> {
    render() {
        return <Switch>
            <Route exact path={RoutePaths.Activity} component={Activity} />
            <Route path={RoutePaths.ActivityNew} component={Create} />
            <Route path={RoutePaths.ActivityEdit} component={Edit} />           
        </Switch>
    }
}