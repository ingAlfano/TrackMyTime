var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import ActivityService from '../../services/ActivityService';
import 'isomorphic-fetch';
var activityService = new ActivityService();
var Activity = (function (_super) {
    __extends(Activity, _super);
    //id: string;
    //name: string;
    //date: Date;
    //startTime: Date;
    //endTime: Date;
    //duration: Date;
    //projectId: string;
    function Activity() {
        var _this = _super.call(this) || this;
        _this.state = {
            activities: [],
            editActivity: {},
            isAddMode: false
        };
        fetch('api/activity/')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ activities: data, editActivity: {}, isAddMode: false });
        });
        return _this;
    }
    Activity.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement("div", { className: "alert alert-info alert-dismissible" },
                React.createElement("button", { type: "button", className: "close", "data-dismiss": "alert", "aria-hidden": "true" }, "x"),
                React.createElement("h4", null, "Information"),
                React.createElement("p", null, "Here you can track your activities and see most recent ones. For the full history see the Reports section ")),
            React.createElement("table", { className: "table" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Name"),
                        React.createElement("th", null, "Date"),
                        React.createElement("th", null, "Start Time"),
                        React.createElement("th", null, "End Time"),
                        React.createElement("th", null, "Duration"),
                        React.createElement("th", null))),
                React.createElement("tbody", null, this.state.activities.map(function (activity) {
                    return React.createElement("tr", { key: activity.Id },
                        React.createElement("td", null, activity.Name),
                        React.createElement("td", null, activity.Date),
                        React.createElement("td", null, activity.StartTime),
                        React.createElement("td", null, activity.EndTime),
                        React.createElement("td", null, activity.Duration));
                }))));
    };
    return Activity;
}(React.Component));
export { Activity };
//# sourceMappingURL=Activity.js.map