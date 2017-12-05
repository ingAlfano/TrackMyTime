// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import 'object-assign';
import * as React from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import ActivityService, { IActivity } from '../../services/ActivityService'
import { RoutePaths } from '../../routes';

let activityService = new ActivityService();

interface EditActivityState {
    activity: IActivity;
    errors: { [key: string]: string }
}


export class Edit extends React.Component<RouteComponentProps<any>, any> {
    constructor() {
        super();
        this.state = {
            activity: {} as IActivity,
            errors: {} as { [key: string]: string }
        };

        fetch('api/activity/' + this.props.match.params.id)
            .then(response => response.json() as Promise<IActivity>)
            .then(data => {
                this.setState({ activity: data });
            });
    }
    
    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.saveContact(this.state.activity);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let activityUpdates = {
            [name]: value
        }

        this.setState({
            activity: (<any>Object).assign(this.state.activity, activityUpdates)
        });
    }

    saveContact(contact: IActivity) {
        this.setState({ errors: {} as { [key: string]: string } });
        activityService.save(contact).then((response) => {
            if (!response.is_error) {
                this.props.history.push(RoutePaths.Activity);
            } else {
                this.setState({ errors: response.error_content });
            }
        });
    }

    _formGroupClass(field: string) {
        var className = "form-group ";
        if (field) {
            className += " has-danger"
        }
        return className;
    }

    render() {
        if (!this.state.contact) {
            return <div>Loading...</div>;
        }
        else {
            return <fieldset className="form-group">
                <legend>{this.state.a.contactId ? "Edit Contact" : "New Contact"}</legend>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className={this._formGroupClass(this.state.errors.lastName)}>
                        <label htmlFor="inputLastName" className="form-control-label">Last Name</label>
                        <input type="text" autoFocus name="lastName" id="inputLastName" value={this.state.contact.lastName} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" required />
                        <div className="form-control-feedback">{this.state.errors.lastName}</div>
                    </div>
                    <div className={this._formGroupClass(this.state.errors.firstName)}>
                        <label htmlFor="inputFirstName" className="form-control-label">First Name</label>
                        <input type="text" name="firstName" id="inputFirstName" value={this.state.contact.firstName} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" required />
                        <div className="form-control-feedback">{this.state.errors.firstName}</div>
                    </div>
                    <div className={this._formGroupClass(this.state.errors.email)}>
                        <label htmlFor="inputEmail" className="form-control-label">Email</label>
                        <input type="email" name="email" id="inputEmail" value={this.state.contact.email} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" />
                        <div className="form-control-feedback">{this.state.errors.email}</div>
                    </div>
                    <div className={this._formGroupClass(this.state.errors.phone)}>
                        <label htmlFor="inputPhone" className="form-control-label">Phone</label>
                        <input type="tel" name="phone" id="inputPhone" value={this.state.contact.phone} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" />
                        <div className="form-control-feedback">{this.state.errors.phone}</div>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                    <Link className="btn btn-lg btn-secondary btn-block" to="/contacts">Cancel</Link>
                </form>
            </fieldset>
        }
    }
}