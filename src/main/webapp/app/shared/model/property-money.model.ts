import { Moment } from 'moment';

export interface IPropertyMoney {
    id?: number;
    address?: string;
    should?: number;
    isPay?: boolean;
    year?: string;
    month?: string;
    remark?: string;
    dlt?: number;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
}

export class PropertyMoney implements IPropertyMoney {
    constructor(
        public id?: number,
        public address?: string,
        public should?: number,
        public isPay?: boolean,
        public year?: string,
        public month?: string,
        public remark?: string,
        public dlt?: number,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment
    ) {
        this.isPay = this.isPay || false;
    }
}
