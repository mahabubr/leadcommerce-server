import { Model, Schema } from 'mongoose';
import { IShipmentStatus } from '../order/order.interface';

export type IShipment = {
  total_amount: number;
  order_id: Schema.Types.ObjectId;
  shipment_status: IShipmentStatus;
  shipment_code: string;
  courier: Schema.Types.ObjectId;
  delivery_name: string;
  buyer_id: Schema.Types.ObjectId;
};

export type ShipmentModel = Model<IShipment, Record<string, unknown>>;

export type IShipmentFilters = {
  searchTerm: string;
  order_id: string;
  shipment_status: string;
  shipment_code: string;
  courier: string;
  delivery_name: string;
  buyer_id: string;
};

export const ShipmentSearchableFields = [
  'shipment_status',
  'courier',
  'delivery_name',
];
export const ShipmentFilterableFields = [
  'searchTerm',
  'shipment_status',
  'courier',
  'delivery_name',
  'order_id',
  'buyer_id',
];
