// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Item from './Item';
import ActivityService, { IActivity } from '../../services/ActivityService';

let activityService = new ActivityService();

export interface IListActivities {
    activities: Array<IActivity>;
    delete(activity: IActivity): void;
}

export class List extends React.Component<IListActivities, { activities: Array<IActivity>}> {  

    public render() {
        if (this.props.activities.length > 0) {
            return <div>
                {
                    this.props.activities.map((activity) =>
                        <Item key={activity.Id} activity={activity} delete={this.props.delete} />
                    )
                }
            </div>;
        }
        return <div>Loading...</div>;
    }
}