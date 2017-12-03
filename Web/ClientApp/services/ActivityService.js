import RestUtilities from './RestUtilities';
var ActivityService = (function () {
    function ActivityService() {
    }
    ActivityService.prototype.fetchAll = function () {
        return RestUtilities.get('/api/activity');
    };
    ActivityService.prototype.fetch = function (id) {
        return RestUtilities.get('/api/activity/${id}');
    };
    ActivityService.prototype.update = function (activity) {
        return RestUtilities.put('/api/activity/${activity.id}', activity);
    };
    ActivityService.prototype.create = function (activity) {
        return RestUtilities.post('/api/activity', activity);
    };
    ActivityService.prototype.save = function (activity) {
        if (activity.Id) {
            return this.update(activity);
        }
        else {
            return this.create(activity);
        }
    };
    ActivityService.prototype.delete = function (id) {
        return RestUtilities.delete('/api/activity/${id}');
    };
    return ActivityService;
}());
export default ActivityService;
//# sourceMappingURL=ActivityService.js.map