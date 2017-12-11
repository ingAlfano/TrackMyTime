// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import * as RoutesModule from '../../routes';
import * as Modal from 'react-modal';
import ActivityService from '../../services/ActivityService';
let activityService = new ActivityService();
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
export class Create extends React.Component {
    constructor() {
        super();
        this.state = {
            activity: {
                Name: '',
                Date: new Date().toISOString().slice(0, 10),
                StartTime: new Date().toTimeString().slice(0, 8),
                EndTime: new Date().toTimeString().slice(0, 8)
            },
            modal: false
        };
        Modal.setAppElement(document.getElementsByTagName('body')[0]);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
    showModal() {
        this.setState({ modal: true });
    }
    closeModal() {
        this.setState({ modal: false });
    }
    getDuration() {
        let durationDate = new Date((Date.parse('01/01/2000 ' + this.state.activity.EndTime) -
            Date.parse('01/01/2000 ' + this.state.activity.StartTime)));
        let durationTime = durationDate.toTimeString().slice(0, 8);
        return `${durationTime.slice(0, 2)} hours, ${durationTime.slice(3, 5)} minutes and ${durationTime.slice(6, 8)} seconds`;
    }
    render() {
        return React.createElement("div", { className: "box" },
            React.createElement("div", { className: "box-header" },
                React.createElement("h3", { className: "box-title" }, "Add new Activity")),
            React.createElement("div", { className: "box-body" },
                React.createElement("form", { onSubmit: (e) => {
                        e.preventDefault();
                        this.showModal();
                    } },
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
                        React.createElement("a", { className: "btn btn-default", href: RoutesModule.RoutePaths.Activities }, "Cancel"))),
                React.createElement(Modal, { isOpen: this.state.modal, style: customStyles, onRequestClose: this.closeModal, contentLabel: "Modal" },
                    React.createElement("div", null, "Confirm activity creation"),
                    React.createElement("form", { onSubmit: (e) => this.handleSubmit(e) },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("span", null,
                                "Are you sure you want to register ",
                                this.getDuration(),
                                " on activity ",
                                this.state.activity.Name,
                                " ?")),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("input", { type: "submit", value: "Create", className: "btn btn-success" }),
                            React.createElement("button", { className: "btn btn-default", onClick: this.closeModal }, "Cancel"))))));
    }
}
//# sourceMappingURL=Create.js.map