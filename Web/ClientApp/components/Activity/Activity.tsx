import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Create } from './Create';
import { List } from './List';
import ActivityService, { IActivity } from '../../services/ActivityService';
import { Link, Redirect } from 'react-router-dom';

import * as RoutesModule from '../../routes';

let activityService = new ActivityService();

interface FetchDataActivityState {
    activities: Array<IActivity>;
    modal: boolean;
    tempActivity: IActivity;
}

export class Activity extends React.Component<RouteComponentProps<{}>, FetchDataActivityState> {
    constructor() {
        super();
        this.state = {
            activities: [] as Array<IActivity>,
            modal: false,
            tempActivity: {} as IActivity
        };

        this.delete = this.delete.bind(this);
        //this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        this.showAll();
    }

    showAll() {
        activityService.fetchAll()
            .then(data => {
                this.setState({ activities: data.content as Array<IActivity> });
            });
    }

    delete(activity: IActivity) {
        activityService.delete(activity.Id).then((response) => {
            this.showAll();
        });
    }


    public render() {
        return <div>
            <div className="alert alert-info alert-dismissible">
                <button type="button" className="close" data-dismiss="alert" aria-hidden="true" >x</button>
                <h4>Information</h4>
                <p>Here you can track your activities and see most recent ones. For the full history see the Reports section </p>
            </div>
            <Link className="btn btn-success" to={RoutesModule.RoutePaths.ActivityNew}>Add new Activity</Link>
            <List activities={this.state.activities} delete={this.delete} />
          
        </div>;
    }
}