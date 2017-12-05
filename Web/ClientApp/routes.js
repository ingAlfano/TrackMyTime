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
import { Route, Switch } from 'react-router-dom';
import { Activity } from './components/Activity/Activity';
import { Create } from './components/Activity/Create';
import { Edit } from './components/Activity/Edit';
var RoutePaths = (function () {
    function RoutePaths() {
    }
    return RoutePaths;
}());
export { RoutePaths };
RoutePaths.Activity = "/activity";
RoutePaths.ActivityEdit = "/activity/edit/:id";
RoutePaths.ActivityNew = "/activity/new";
var Routes = (function (_super) {
    __extends(Routes, _super);
    function Routes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Routes.prototype.render = function () {
        return React.createElement(Switch, null,
            React.createElement(Route, { exact: true, path: RoutePaths.Activity, component: Activity }),
            React.createElement(Route, { path: RoutePaths.ActivityNew, component: Create }),
            React.createElement(Route, { path: RoutePaths.ActivityEdit, component: Edit }));
    };
    return Routes;
}(React.Component));
export default Routes;
//# sourceMappingURL=routes.js.map