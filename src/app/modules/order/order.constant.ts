import {
  IOrderStatus,
  IPaymentStatus,
  IShipmentStatus,
} from './order.interface';

export const OrderStatus: IOrderStatus[] = ['pending', 'delivered', 'cancel'];
export const PaymentStatus: IPaymentStatus[] = [
  'pending',
  'completed',
  'canceled',
];
export const ShipmentStatus: IShipmentStatus[] = [
  'pending',
  'completed',
  'canceled',
];

export const OrderSearchableFields = ['OrderName', 'slug'];
export const OrderFilterableFields = [
  'OrderName',
  'searchTerm',
  'price',
  'quantity',
];
