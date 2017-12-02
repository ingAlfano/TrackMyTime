import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Create } from './Create';

export class Activity extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <div className="alert alert-info alert-dismissible">
                <button type="button" className="close" data-dismiss="alert" aria-hidden="true" >X</button>
                <h4>Information</h4>
                <p>Here you can track your activities and see most recent ones. For the full history see the Reports section </p>
            </div>
            <Create />
        </div>;
    }
}
