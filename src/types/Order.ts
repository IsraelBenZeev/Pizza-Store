import { OrderCartType } from './orderCart';

export type OrderType = {
  address: string;
  cart: OrderCartType[];
  customer: string;
  phone: string;
  priority: boolean;
  estimatedDelivery?: string;
  id?: string;
  orderPrice?: number;
  priorityPrice?: number;
  status?: string;
};
