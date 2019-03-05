import { Moment } from 'moment';

export interface IStuff {
    id?: number;
    userId?: string;
    stuffname?: string;
    gender?: string;
    phone?: string;
    email?: string;
    idcard?: string;
    address?: string;
    remark?: string;
    dlt?: number;
    create_user?: string;
    createDate?: Moment;
    update_user?: string;
    update_date?: Moment;
}

export class Stuff implements IStuff {
    constructor(
        public id?: number,
        public userId?: string,
        public stuffname?: string,
        public gender?: string,
        public phone?: string,
        public email?: string,
        public idcard?: string,
        public address?: string,
        public remark?: string,
        public dlt?: number,
        public create_user?: string,
        public createDate?: Moment,
        public update_user?: string,
        public update_date?: Moment
    ) {}
}
