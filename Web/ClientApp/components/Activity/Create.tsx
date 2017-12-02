// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Create extends React.Component<any, {}> {
    public render() {
        return <div className="box">
            <div className="box-header">
                <h3 className="box-title">Add new Activity</h3>
                <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="" data-original-title="Collapse">
                        <i className="fa fa-minus"></i>
                    </button>
                </div>
            </div>
            <div className="box-body">
                <form asp-action="Create">
                    <div asp-validation-summary="ModelOnly" className="text-danger"></div>
                    <div className="form-group">
                        <label asp-for="Name" className="control-label"></label>
                        <input asp-for="Name" className="form-control" placeholder="What did you do?" />
                        <span asp-validation-for="Name" className="text-danger"></span>
                    </div>
                    <div className="form-group">
                        <label asp-for="Date" className="control-label"></label>
                        <input asp-for="Date" className="form-control" />
                        <span asp-validation-for="Date" className="text-danger"></span>
                    </div>
                    <div className="form-group">
                        <label asp-for="StartTime" className="control-label"></label>
                        <input asp-for="StartTime" className="form-control" />
                        <span asp-validation-for="StartTime" className="text-danger"></span>
                    </div>
                    <div className="form-group">
                        <label asp-for="EndTime" className="control-label"></label>
                        <input asp-for="EndTime" className="form-control" />
                        <span asp-validation-for="EndTime" className="text-danger"></span>
                    </div>

                <div className="form-group">
                    <input type="submit" value="Create" className="btn btn-default" />
                </div>
        </form>
        </div>
</div >;
    }
}