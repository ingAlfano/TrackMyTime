import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Create } from './Create';
import { List } from './List';
import ActivityService, { IActivity } from '../../services/ActivityService';
import 'isomorphic-fetch';
//import ConfirmLink from 'react-modal';

let activityService = new ActivityService();

interface FetchDataActivityState {
    activities: IActivity[];
    isAddMode: boolean;
    editActivity: Object;
}


export class Activity extends React.Component<RouteComponentProps<{}>, FetchDataActivityState> {
    constructor() {
        super();
        this.state = {
            activities: [] as IActivity[],
            editActivity: {},
            isAddMode: false as boolean
        };

        fetch('api/activity/')
            .then(response => response.json() as Promise<IActivity[]>)
            .then(data => {
                this.setState({ activities: data, editActivity: {}, isAddMode: false });
            });
    }
    public alertSum() {
        alert();
    }
    public render() {
        return <div>
            <div className="alert alert-info alert-dismissible">
                <button type="button" className="close" data-dismiss="alert" aria-hidden="true" >x</button>
                <h4>Information</h4>
                <p>Here you can track your activities and see most recent ones. For the full history see the Reports section </p>
            </div>

            <List items={this.state.activities} />
        </div>;
    }
}