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

export const defaultValue: Readonly<IPropertyMoney> = {
  isPay: false
};
