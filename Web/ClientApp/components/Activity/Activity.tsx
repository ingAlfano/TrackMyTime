import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Create } from './Create';
import { List } from './List';
import ActivityService, { IActivity } from '../../services/ActivityService';
import 'isomorphic-fetch';
//import ConfirmLink from 'react-modal';

let activityService = new ActivityService();

interface FetchActivityState {
    activities: Array<IActivity>;
}


export class Activity extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            activities: [] as Array<IActivity>
        };


        activityService.fetchAll()
            .then(response => {
                this.setState( { activities: response.content });
            });
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