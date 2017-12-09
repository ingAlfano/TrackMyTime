import * as React from 'react';
import { List } from './List';
import ActivityService from '../../services/ActivityService';
import { Link } from 'react-router-dom';
import * as RoutesModule from '../../routes';
let activityService = new ActivityService();
export class Activity extends React.Component {
    constructor() {
        super();
        this.state = {
            activities: [],
            modal: false,
            tempActivity: {}
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
            this.setState({ activities: data.content });
        });
    }
    delete(activity) {
        activityService.delete(activity.Id).then((response) => {
            this.showAll();
        });
    }
    render() {
        return React.createElement("div", null,
            React.createElement("div", { className: "alert alert-info alert-dismissible" },
                React.createElement("button", { type: "button", className: "close", "data-dismiss": "alert", "aria-hidden": "true" }, "x"),
                React.createElement("h4", null, "Information"),
                React.createElement("p", null, "Here you can track your activities and see most recent ones. For the full history see the Reports section ")),
            React.createElement(Link, { className: "btn btn-success", to: RoutesModule.RoutePaths.ActivityNew }, "Add new Activity"),
            React.createElement(List, { activities: this.state.activities, delete: this.delete }));
    }
}
//# sourceMappingURL=Activity.js.map