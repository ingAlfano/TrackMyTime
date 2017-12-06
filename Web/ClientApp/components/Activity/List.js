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
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
var List = (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    List.prototype.render = function () {
        return React.createElement("div", null, this.props.items.map(function (activity) {
            return React.createElement("ul", { className: "timeline", key: activity.Id },
                React.createElement("li", { className: "time-label" },
                    React.createElement("span", { className: "bg-red" }, activity.Date)),
                React.createElement("li", null,
                    React.createElement("i", { className: "fa fa-clock-o bg-blue" }),
                    React.createElement("div", { className: "timeline-item" },
                        React.createElement("span", { className: "time" },
                            React.createElement("i", { className: "fa fa-clock-o" }),
                            " ",
                            activity.Duration,
                            "h"),
                        React.createElement("h3", { className: "timeline-header" },
                            React.createElement("a", null,
                                " ",
                                activity.Name)),
                        React.createElement("div", { className: "timeline-body" },
                            React.createElement("h4", null, activity.Project == null || activity.Project.Client == null ? "None Client" : activity.Project.Client.Name),
                            React.createElement("h4", null, activity.Project == null ? "None Project" : activity.Project.Name),
                            React.createElement("label", { htmlFor: "StartTime" }, "From"),
                            React.createElement("span", { htmlFor: "StartTime" }, activity.StartTime),
                            React.createElement("label", { htmlFor: "EndTime" }, "To"),
                            React.createElement("span", { htmlFor: "EndTime" }, activity.EndTime)),
                        React.createElement("div", { className: "timeline-footer" },
                            React.createElement("a", { className: "btn btn-primary btn-xs" }, "Edit"),
                            React.createElement("a", { className: "btn btn-danger btn-xs" }, "Delete")))));
        }));
    };
    return List;
}(React.Component));
export { List };
//# sourceMappingURL=List.js.map