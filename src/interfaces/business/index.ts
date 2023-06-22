import { ServiceInterface } from 'interfaces/service';
import { TechnicianInterface } from 'interfaces/technician';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BusinessInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  service?: ServiceInterface[];
  technician?: TechnicianInterface[];
  user?: UserInterface;
  _count?: {
    service?: number;
    technician?: number;
  };
}

export interface BusinessGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
