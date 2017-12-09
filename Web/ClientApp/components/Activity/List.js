// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import Item from './Item';
import ActivityService from '../../services/ActivityService';
let activityService = new ActivityService();
export class List extends React.Component {
    render() {
        if (this.props.activities.length > 0) {
            return React.createElement("div", null, this.props.activities.map((activity) => React.createElement(Item, { key: activity.Id, activity: activity, delete: this.props.delete })));
        }
        return React.createElement("div", null, "Loading...");
    }
}
//# sourceMappingURL=List.js.map