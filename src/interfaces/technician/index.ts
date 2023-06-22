import { OrderInterface } from 'interfaces/order';
import { UserInterface } from 'interfaces/user';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface TechnicianInterface {
  id?: string;
  user_id: string;
  business_id: string;
  created_at?: any;
  updated_at?: any;
  order?: OrderInterface[];
  user?: UserInterface;
  business?: BusinessInterface;
  _count?: {
    order?: number;
  };
}

export interface TechnicianGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  business_id?: string;
}
