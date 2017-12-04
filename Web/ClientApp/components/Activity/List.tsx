// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IActivity } from '../../services/ActivityService';



export class List extends React.Component<{ items: IActivity[] }, {}> {
    public render() {
        return <ul className="timeline">
            {this.props.items.map((activity) =>
                <li>
            <li className="time-label">
                    <span className="bg-red">
                        {activity.Date}
                </span>
            </li>
            
                <li>
                    <i className="fa fa-clock-o bg-blue"></i>
                    <div className="timeline-item">
                        <span className="time"><i className="fa fa-clock-o"></i> {activity.Duration.getHours()}h</span>
                        <h3 className="timeline-header"><a> {activity.Name}</a></h3>
                        <div className="timeline-body">
                                <h4>{activity.Project.Client.Name.length < 1 ? "None Client" : activity.Project.Client.Name}</h4>
                                <h4>{activity.Project.Name.length < 1 ? "None Project" : activity.Project.Name}</h4>
                            <label htmlFor="StartTime">From</label>
                            <p>{activity.StartTime}</p>
                            <label htmlFor="EndTime">From</label>
                            <p>{activity.EndTime}</p>
                        </div>
                    <div className="timeline-footer">
                        <a className="btn btn-primary btn-xs">Edit</a>
                    <a className="btn btn-danger btn-xs">Delete</a>
                        </div>
                    </div>
                </li>
                    </li>
                    )}
</ul >;
    }
}