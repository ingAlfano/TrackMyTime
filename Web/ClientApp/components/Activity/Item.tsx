// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ActivityService, { IActivity } from '../../services/ActivityService';

let activityService = new ActivityService();

export interface IActivityItem {
    activity: IActivity;
    delete(activity: IActivity): void;
}

export default class Item extends React.Component<IActivityItem, { activity: IActivity }> {
    public render() {
        return <ul className="timeline" key={this.props.activity.Id} >
            <li className="time-label">
                <span className="bg-red">
                    {new Date(this.props.activity.Date).toDateString()}
                </span>
            </li>
            <li>
                <i className="fa fa-clock-o bg-blue"></i>
                <div className="timeline-item">
                    <span className="time"><i className="fa fa-clock-o"></i> {this.props.activity.Duration} h</span>
                    <h3 className="timeline-header"><a> {this.props.activity.Name}</a></h3>
                    <div className="timeline-body">
                        <label htmlFor="StartTime">From</label><span htmlFor="StartTime">{this.props.activity.StartTime}</span>
                        <label htmlFor="EndTime">To</label><span htmlFor="EndTime">{this.props.activity.EndTime}</span>
                    </div>
                    <div className="timeline-footer">
                        <a className="btn btn-primary btn-xs">Edit</a>
                        <button className="btn btn-danger btn-xs" onClick={(e) => this.props.delete(this.props.activity)}> Delete</button>
                    </div>
                </div>
            </li>
        </ul>;
    }
}