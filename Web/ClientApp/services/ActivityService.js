import RestUtilities from './RestUtilities';
export default class ActivityService {
    fetchAll() {
        return RestUtilities.get('/api/activity');
    }
    fetch(id) {
        return RestUtilities.get('/api/activity/${id}');
    }
    update(activity) {
        return RestUtilities.put('/api/activity/${activity.id}', activity);
    }
    create(activity) {
        return RestUtilities.post('/api/activity', activity);
    }
    save(activity) {
        if (activity.Id) {
            return this.update(activity);
        }
        else {
            return this.create(activity);
        }
    }
    getClientByProject(projectId) {
        return RestUtilities.get('/api/activity/${projectId}');
    }
    delete(id) {
        return RestUtilities.delete('/api/activity/' + id);
    }
}
//# sourceMappingURL=ActivityService.js.map