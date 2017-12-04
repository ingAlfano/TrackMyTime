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
        return React.createElement("ul", { className: "timeline" }, this.props.items.map(function (activity) {
            return React.createElement("li", null,
                React.createElement("li", { className: "time-label" },
                    React.createElement("span", { className: "bg-red" }, activity.Date)),
                React.createElement("li", null,
                    React.createElement("i", { className: "fa fa-clock-o bg-blue" }),
                    React.createElement("div", { className: "timeline-item" },
                        React.createElement("span", { className: "time" },
                            React.createElement("i", { className: "fa fa-clock-o" }),
                            " ",
                            activity.Duration.getHours(),
                            "h"),
                        React.createElement("h3", { className: "timeline-header" },
                            React.createElement("a", null,
                                " ",
                                activity.Name)),
                        React.createElement("div", { className: "timeline-body" },
                            React.createElement("label", { htmlFor: "StartTime" }, "From"),
                            React.createElement("p", null, activity.StartTime),
                            React.createElement("label", { htmlFor: "EndTime" }, "From"),
                            React.createElement("p", null, activity.EndTime)),
                        React.createElement("div", { className: "timeline-footer" },
                            React.createElement("a", { className: "btn btn-primary btn-xs" }, "Edit"),
                            React.createElement("a", { className: "btn btn-danger btn-xs" }, "Delete")))));
        }));
    };
    return List;
}(React.Component));
export { List };
//# sourceMappingURL=List.js.map