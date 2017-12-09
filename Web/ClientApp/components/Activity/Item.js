// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import ActivityService from '../../services/ActivityService';
let activityService = new ActivityService();
export default class Item extends React.Component {
    render() {
        return React.createElement("ul", { className: "timeline", key: this.props.activity.Id },
            React.createElement("li", { className: "time-label" },
                React.createElement("span", { className: "bg-red" }, new Date(this.props.activity.Date).toDateString())),
            React.createElement("li", null,
                React.createElement("i", { className: "fa fa-clock-o bg-blue" }),
                React.createElement("div", { className: "timeline-item" },
                    React.createElement("span", { className: "time" },
                        React.createElement("i", { className: "fa fa-clock-o" }),
                        " ",
                        this.props.activity.Duration,
                        " h"),
                    React.createElement("h3", { className: "timeline-header" },
                        React.createElement("a", null,
                            " ",
                            this.props.activity.Name)),
                    React.createElement("div", { className: "timeline-body" },
                        React.createElement("label", { htmlFor: "StartTime" }, "From"),
                        React.createElement("span", { htmlFor: "StartTime" }, this.props.activity.StartTime),
                        React.createElement("label", { htmlFor: "EndTime" }, "To"),
                        React.createElement("span", { htmlFor: "EndTime" }, this.props.activity.EndTime)),
                    React.createElement("div", { className: "timeline-footer" },
                        React.createElement("a", { className: "btn btn-primary btn-xs" }, "Edit"),
                        React.createElement("button", { className: "btn btn-danger btn-xs", onClick: (e) => this.props.delete(this.props.activity) }, " Delete")))));
    }
}
//# sourceMappingURL=Item.js.map