import RestUtilities from './RestUtilities';

export interface IActivity {
    Id: string;
    Name: string;
    Date: Date;
    StartTime: Date;
    EndTime: Date;
    Duration: Date;
    ProjectId: string;
    Project: { Id: string, Name: string, Client: { Id: string, Name: string } }
}

export default class ActivityService {
    fetchAll() {
        return RestUtilities.get<Array<IActivity>>('/api/activity');
    }

    fetch(id: string) {
        return RestUtilities.get<IActivity>('/api/activity/${id}');
    }

    update(activity: IActivity) {
        return RestUtilities.put<IActivity>('/api/activity/${activity.id}', activity);
    }

    create(activity: IActivity) {
        return RestUtilities.post<IActivity>('/api/activity', activity);
    }

    save(activity: IActivity) {
        if (activity.Id) {
            return this.update(activity);
        } else {
            return this.create(activity);
        }
    }

    delete(id: number) {
        return RestUtilities.delete('/api/activity/${id}');
    }
}

