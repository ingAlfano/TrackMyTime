import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Create } from './Create';
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
    //id: string;
    //name: string;
    //date: Date;
    //startTime: Date;
    //endTime: Date;
    //duration: Date;
    //projectId: string;
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

            <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Duration</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.activities.map((activity) =>
                        <tr key={activity.Id}>
                            <td>{activity.Name}</td>
                            <td>{activity.Date}</td>
                            <td>{activity.StartTime}</td>
                            <td>{activity.EndTime}</td>
                            <td>{activity.Duration}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
        </div>;
    }
}