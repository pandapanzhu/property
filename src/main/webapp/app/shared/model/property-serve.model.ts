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

export const defaultValue: Readonly<IPropertyServe> = {};
