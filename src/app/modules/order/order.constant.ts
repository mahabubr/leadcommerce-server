import {
  IOrderStatus,
  IPaymentStatus,
  IShipmentStatus,
} from './order.interface';

export const OrderStatus: IOrderStatus[] = [
  'pending',
  'delivered',
  'cancel',
  'paused',
];
export const PaymentStatus: IPaymentStatus[] = [
  'pending',
  'completed',
  'canceled',
];
export const ShipmentStatus: IShipmentStatus[] = [
  'pending',
  'completed',
  'canceled',
  'paused',
];

export const OrderSearchableFields = [
  'payment_status',
  'shipment_status',
  'order_status',
  'order_code',
];
export const OrderFilterableFields = [
  'searchTerm',
  'order_code',
  'order_status',
  'total_items',
  'total_quantity',
  'total_amount',
];
