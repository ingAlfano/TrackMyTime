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
var Create = (function (_super) {
    __extends(Create, _super);
    function Create() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Create.prototype.render = function () {
        return React.createElement("div", { className: "box" },
            React.createElement("div", { className: "box-header" },
                React.createElement("h3", { className: "box-title" }, "Add new Activity"),
                React.createElement("div", { className: "box-tools pull-right" },
                    React.createElement("button", { type: "button", className: "btn btn-box-tool", "data-widget": "collapse", "data-toggle": "tooltip", title: "", "data-original-title": "Collapse" },
                        React.createElement("i", { className: "fa fa-minus" })))),
            React.createElement("div", { className: "box-body" },
                React.createElement("form", { "asp-action": "Create" },
                    React.createElement("div", { "asp-validation-summary": "ModelOnly", className: "text-danger" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { "asp-for": "Name", className: "control-label" }),
                        React.createElement("input", { "asp-for": "Name", className: "form-control", placeholder: "What did you do?" }),
                        React.createElement("span", { "asp-validation-for": "Name", className: "text-danger" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { "asp-for": "Date", className: "control-label" }),
                        React.createElement("input", { "asp-for": "Date", className: "form-control" }),
                        React.createElement("span", { "asp-validation-for": "Date", className: "text-danger" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { "asp-for": "StartTime", className: "control-label" }),
                        React.createElement("input", { "asp-for": "StartTime", className: "form-control" }),
                        React.createElement("span", { "asp-validation-for": "StartTime", className: "text-danger" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { "asp-for": "EndTime", className: "control-label" }),
                        React.createElement("input", { "asp-for": "EndTime", className: "form-control" }),
                        React.createElement("span", { "asp-validation-for": "EndTime", className: "text-danger" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("input", { type: "submit", value: "Create", className: "btn btn-default" })))));
    };
    return Create;
}(React.Component));
export { Create };
//# sourceMappingURL=Create.js.map