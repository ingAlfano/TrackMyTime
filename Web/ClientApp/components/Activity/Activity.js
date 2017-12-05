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
import { List } from './List';
import ActivityService from '../../services/ActivityService';
import 'isomorphic-fetch';
//import ConfirmLink from 'react-modal';
var activityService = new ActivityService();
var Activity = (function (_super) {
    __extends(Activity, _super);
    function Activity() {
        var _this = _super.call(this) || this;
        _this.state = {
            activities: []
        };
        activityService.fetchAll()
            .then(function (response) {
            _this.setState({ activities: response.content });
        });
        return _this;
    }
    Activity.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement("div", { className: "alert alert-info alert-dismissible" },
                React.createElement("button", { type: "button", className: "close", "data-dismiss": "alert", "aria-hidden": "true" }, "x"),
                React.createElement("h4", null, "Information"),
                React.createElement("p", null, "Here you can track your activities and see most recent ones. For the full history see the Reports section ")),
            React.createElement(List, { items: this.state.activities }));
    };
    return Activity;
}(React.Component));
export { Activity };
//# sourceMappingURL=Activity.js.map