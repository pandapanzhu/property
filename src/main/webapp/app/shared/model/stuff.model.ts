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

export const defaultValue: Readonly<IStuff> = {};
