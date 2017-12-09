// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import * as RoutesModule from '../../routes';
import ActivityService from '../../services/ActivityService';
let activityService = new ActivityService();
export class Create extends React.Component {
    constructor() {
        super();
        this.state = {
            activity: {
                Name: '',
                Date: new Date().toISOString().slice(0, 10),
                StartTime: new Date().toTimeString().slice(0, 8),
                EndTime: new Date().toTimeString().slice(0, 8)
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        this.saveActivity(this.state.activity);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let activityUpdates = {
            [name]: value
        };
        this.setState({
            activity: Object.assign(this.state.activity, activityUpdates)
        });
    }
    saveActivity(activity) {
        activityService.save(activity).then((response) => {
            if (!response.is_error) {
                this.props.history.push(RoutesModule.RoutePaths.Activities);
            }
        });
    }
    render() {
        return React.createElement("div", { className: "box" },
            React.createElement("div", { className: "box-header" },
                React.createElement("h3", { className: "box-title" }, "Add new Activity")),
            React.createElement("div", { className: "box-body" },
                React.createElement("form", { onSubmit: (e) => this.handleSubmit(e) },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { htmlFor: "Name", className: "form-control-label" }),
                        React.createElement("input", { maxLength: 20, id: "Name", name: "Name", className: "form-control form-control-danger", required: true, placeholder: "What did you do?", onChange: (e) => this.handleChange(e) })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { htmlFor: "Date", className: "form-control-label" }),
                        React.createElement("input", { id: "Date", name: "Date", defaultValue: this.state.activity.Date, type: "date", className: "form-control", required: true, onChange: (e) => this.handleChange(e) })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { htmlFor: "StartTime", className: "form-control-label" }),
                        React.createElement("input", { id: "StartTime", name: "StartTime", defaultValue: this.state.activity.StartTime, type: "time", className: "form-control", onChange: (e) => this.handleChange(e) })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { htmlFor: "EndTime", className: "form-control-label" }),
                        React.createElement("input", { id: "EndTime", name: "EndTime", defaultValue: this.state.activity.EndTime, type: "time", className: "form-control", onChange: (e) => this.handleChange(e) })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("input", { type: "submit", value: "Create", className: "btn btn-success" }),
                        React.createElement("a", { className: "btn btn-default", href: RoutesModule.RoutePaths.Activities }, "Cancel")))));
    }
}
//# sourceMappingURL=Create.js.map