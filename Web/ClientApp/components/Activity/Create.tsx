// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import * as RoutesModule from '../../routes';
import * as Modal from 'react-modal';
import ActivityService, { IActivity } from '../../services/ActivityService';
import RestUtilities, { IErrorContent } from '../../services/RestUtilities';

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

export class Create extends React.Component<any, { activity: IActivity, modal: boolean }> {
    constructor() {
        super();
        this.state = {
            activity: {
                Name: '',
                Date: new Date().toISOString().slice(0, 10),
                StartTime: new Date().toTimeString().slice(0,8),
                EndTime: new Date().toTimeString().slice(0, 8)
            } as IActivity,
            modal: false
        }

        Modal.setAppElement(document.getElementsByTagName('body')[0]);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.saveActivity(this.state.activity);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let activityUpdates = {
            [name]: value
        }

        this.setState({
            activity: Object.assign(this.state.activity, activityUpdates)
        });
    }

    saveActivity(activity: IActivity) {
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

    getDuration(): string {
        let durationDate = new Date((Date.parse('01/01/2000 ' + this.state.activity.EndTime) -
            Date.parse('01/01/2000 ' + this.state.activity.StartTime)));

        let durationTime = durationDate.toTimeString().slice(0, 8)

        return `${durationTime.slice(0, 2)} hours, ${durationTime.slice(3, 5)} minutes and ${durationTime.slice(6, 8)} seconds`;
    }

    public render() {
        return <div className="box">
            <div className="box-header">
                <h3 className="box-title">Add new Activity</h3>
            </div>
            <div className="box-body">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.showModal();
                }}>

                    <div className="form-group">
                        <label htmlFor="Name" className="form-control-label"></label>
                        <input maxLength={20} id="Name" name="Name" className="form-control form-control-danger" required placeholder="What did you do?" onChange={(e) => this.handleChange(e)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Date" className="form-control-label"></label>
                        <input id="Date" name="Date" defaultValue={this.state.activity.Date} type="date" className="form-control" required onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="StartTime" className="form-control-label"></label>
                        <input id="StartTime" name="StartTime" defaultValue={this.state.activity.StartTime} type="time" className="form-control" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="EndTime" className="form-control-label"></label>
                        <input id="EndTime" name="EndTime" defaultValue={this.state.activity.EndTime} type="time" className="form-control" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-success" />
                        <a className="btn btn-default" href={RoutesModule.RoutePaths.Activities}>Cancel</a>
                    </div>
                </form>
                <Modal
                    isOpen={this.state.modal}
                    style={customStyles}
                    onRequestClose={this.closeModal}
                    contentLabel="Modal">
                    <div>Confirm activity creation</div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="form-group">
                            <span>Are you sure you want to register {this.getDuration()} on activity {this.state.activity.Name} ?</span>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create" className="btn btn-success" />
                            <button className="btn btn-default" onClick={this.closeModal}>Cancel</button>        
                        </div>
                    </form>
                </Modal>
            </div>
        </div >;
    }
}