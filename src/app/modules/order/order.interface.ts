import { Model, Types } from 'mongoose';
import { IProducts } from '../products/products.interface';

export type IOrdersProductList = {
  product_id: Types.ObjectId | IProducts;
  product_quantity: number;
  product_price: number;
};

/* orders request for buyer */
export type IOrdersReq = {
  order_id: string;
  user_Id: Types.ObjectId;
  order_product_list: IOrdersProductList[];
  amount: number;
  coupon_code: string;
  coupon_discount: 200; // default should be 0
  total_amount: number;
};

export type IOrdersFilters = {
  searchTerm: string;
};

export type IOrderStatus = 'pending' | 'delivered' | 'cancel';
export type IPaymentStatus = 'pending' | 'completed' | 'canceled';
export type IShipmentStatus = 'pending' | 'completed' | 'canceled';

/* orders */
export type IOrders = {
  buyer_id?: Types.ObjectId | string;
  user_id: Types.ObjectId; // vendor user_id
  order_code: string; // automatically generated should be unique
  order_product_list: IOrdersProductList[];
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
  shipment_date?: string;
};

export type OrdersModel = Model<IOrders, Record<string, unknown>>;
