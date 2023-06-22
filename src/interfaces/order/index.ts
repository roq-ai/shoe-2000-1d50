import { UserInterface } from 'interfaces/user';
import { ServiceInterface } from 'interfaces/service';
import { TechnicianInterface } from 'interfaces/technician';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  customer_id: string;
  service_id: string;
  technician_id?: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  service?: ServiceInterface;
  technician?: TechnicianInterface;
  _count?: {};
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  service_id?: string;
  technician_id?: string;
  status?: string;
}
