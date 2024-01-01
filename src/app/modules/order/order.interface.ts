import { Model, Types } from 'mongoose';
import { IProducts } from '../products/products.interface';

export type IOrdersProductList = {
  product_id: Types.ObjectId | IProducts;
  product_quantity: number;
  product_name: string;
  product_price: number;
};

type shipment_address = {
  house_no?: string;
  road_no?: string;
  area?: string;
  district?: string;
  country?: string;
};

/* orders request for buyer */
export type IOrdersReq = {
  buyer_id?: string;
  order_id: string;
  user_Id: Types.ObjectId;
  order_product_list: IOrdersProductList[];
  amount: number;
  coupon_code: string;
  coupon_discount: 200; // default should be 0
  total_amount: number;
  shipment_address?: shipment_address;
  shipment_date?: string;
};

export type IOrdersFilters = {
  searchTerm: string;
};

export type IOrderStatus =
  | 'pending'
  | 'delivered'
  | 'cancel'
  | 'paused'
  | 'accept'
  | 'refunds';
export type IPaymentStatus = 'pending' | 'completed' | 'canceled';
export type IShipmentStatus = 'pending' | 'completed' | 'canceled' | 'paused';

/* orders */
export type IOrders = {
  buyer_id?: Types.ObjectId | string;
  store_id: Types.ObjectId; // vendor user_id
  order_code: string; // automatically generated should be unique
  order_product_list: IOrdersProductList[];
  total_items: number;
  total_quantity: number;
  amount: number;
  order_status: IOrderStatus;
  coupon_code: string;
  coupon_discount: number; // default should be 0
  total_amount: number;
  payment_id?: Types.ObjectId;
  payment_status?: 'pending' | 'completed' | 'canceled';
  payment_date?: string;
  shipment_id?: Types.ObjectId;
  shipment_status?: 'pending' | 'completed' | 'canceled';
  shipment_address?: shipment_address;
  shipment_date?: string;
};

export type OrdersModel = Model<IOrders, Record<string, unknown>>;
