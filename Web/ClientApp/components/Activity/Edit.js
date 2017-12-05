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
import 'object-assign';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ActivityService from '../../services/ActivityService';
import { RoutePaths } from '../../routes';
var activityService = new ActivityService();
var Edit = (function (_super) {
    __extends(Edit, _super);
    function Edit() {
        var _this = _super.call(this) || this;
        _this.state = {
            activity: {},
            errors: {}
        };
        fetch('api/activity/' + _this.props.match.params.id)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ activity: data });
        });
        return _this;
    }
    Edit.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.saveContact(this.state.activity);
    };
    Edit.prototype.handleInputChange = function (event) {
        var _this = this;
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        var activityUpdates = (_a = {},
            _a[name] = value,
            _a);
        this.setState({
            activity: (React.createElement("any", null,
                "Object).assign(this.state.activity, activityUpdates) }); } saveContact(contact: IActivity) ",
                this.setState({ errors: {} }),
                "activityService.save(contact).then((response) => ",
            ,
                " (!response.is_error) ",
                this.props.history.push(RoutePaths.Activity),
                "} else ",
                this.setState({ errors: response.error_content }),
                "} }); } _formGroupClass(field: string) ",
            ,
                " className = \"form-group \"; if (field) ",
                className += " has-danger",
                "return className; } render() ",
            ,
                " (!this.state.contact) ",
            ,
                " ",
                React.createElement("div", null, "Loading..."),
                "; } else ",
            ,
                " ",
                React.createElement("fieldset", { className: "form-group" },
                    React.createElement("legend", null, this.state.a.contactId ? "Edit Contact" : "New Contact"),
                    React.createElement("form", { onSubmit: function (e) { return _this.handleSubmit(e); } },
                        React.createElement("div", { className: this._formGroupClass(this.state.errors.lastName) },
                            React.createElement("label", { htmlFor: "inputLastName", className: "form-control-label" }, "Last Name"),
                            React.createElement("input", { type: "text", autoFocus: true, name: "lastName", id: "inputLastName", value: this.state.contact.lastName, onChange: function (e) { return _this.handleInputChange(e); }, className: "form-control form-control-danger", required: true }),
                            React.createElement("div", { className: "form-control-feedback" }, this.state.errors.lastName)),
                        React.createElement("div", { className: this._formGroupClass(this.state.errors.firstName) },
                            React.createElement("label", { htmlFor: "inputFirstName", className: "form-control-label" }, "First Name"),
                            React.createElement("input", { type: "text", name: "firstName", id: "inputFirstName", value: this.state.contact.firstName, onChange: function (e) { return _this.handleInputChange(e); }, className: "form-control form-control-danger", required: true }),
                            React.createElement("div", { className: "form-control-feedback" }, this.state.errors.firstName)),
                        React.createElement("div", { className: this._formGroupClass(this.state.errors.email) },
                            React.createElement("label", { htmlFor: "inputEmail", className: "form-control-label" }, "Email"),
                            React.createElement("input", { type: "email", name: "email", id: "inputEmail", value: this.state.contact.email, onChange: function (e) { return _this.handleInputChange(e); }, className: "form-control form-control-danger" }),
                            React.createElement("div", { className: "form-control-feedback" }, this.state.errors.email)),
                        React.createElement("div", { className: this._formGroupClass(this.state.errors.phone) },
                            React.createElement("label", { htmlFor: "inputPhone", className: "form-control-label" }, "Phone"),
                            React.createElement("input", { type: "tel", name: "phone", id: "inputPhone", value: this.state.contact.phone, onChange: function (e) { return _this.handleInputChange(e); }, className: "form-control form-control-danger" }),
                            React.createElement("div", { className: "form-control-feedback" }, this.state.errors.phone)),
                        React.createElement("button", { className: "btn btn-lg btn-primary btn-block", type: "submit" }, "Save"),
                        React.createElement(Link, { className: "btn btn-lg btn-secondary btn-block", to: "/contacts" }, "Cancel"))),
                "} } }"))
        });
        var _a;
    };
    return Edit;
}(React.Component));
export { Edit };
//# sourceMappingURL=Edit.js.map