import { Moment } from 'moment';

export interface IPropertyServe {
    id?: number;
    userId?: string;
    reason?: string;
    type?: string;
    remark?: string;
    dlt?: number;
    create_user?: string;
    createDate?: Moment;
    update_user?: string;
    update_date?: Moment;
}

export class PropertyServe implements IPropertyServe {
    constructor(
        public id?: number,
        public userId?: string,
        public reason?: string,
        public type?: string,
        public remark?: string,
        public dlt?: number,
        public create_user?: string,
        public createDate?: Moment,
        public update_user?: string,
        public update_date?: Moment
    ) {}
}
