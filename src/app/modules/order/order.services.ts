import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Products } from '../products/products.model';
import { IOrders, IOrdersReq } from './order.interface';
import { Orders } from './order.model';
import { generatedOrderCode } from './order.utils';

// * create Order
const createOrder = async (payload: IOrdersReq): Promise<IOrders | null> => {
  // console.log(payload);
  const { order_product_list, amount, shipment_address } = payload;

  /**
   ** [step-01] check same product product are listed in the db with id, price and quantity
   ** [step-02] coupon checking
   ** [step-03] checking price calculation is right
   ** [step-04] generate a order code
   ** [step-05] create a order and reduce product quantity from product table
   */

  //**[step-01] check same product product are listed in the db with id, price and quantity
  if (order_product_list.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product is not found!');
  }

  for (const orderProduct of order_product_list) {
    const productId = orderProduct.product_id;
    const productPrice = orderProduct.product_price;
    const productQuantity = orderProduct.product_quantity;
    if (
      typeof productId !== 'string' ||
      typeof orderProduct.product_price !== 'number'
    ) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'request product details is not matching!'
      );
    }

    const isExistProduct = await Products.findById(productId);

    if (
      !isExistProduct ||
      isExistProduct.price !== productPrice ||
      isExistProduct.quantity < productQuantity
    ) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'request product details is not matching!'
      );
    }
  }

  //**[step-02] coupon checking // TODO: coupon functionality

  //**[step-03] checking price calculation is right
  let total_price = 0;
  for (const orderProduct of order_product_list) {
    const productPrice = orderProduct.product_price;
    const productQuantity = orderProduct.product_quantity;

    total_price += productPrice * productQuantity;
  }

  if (total_price !== amount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'request amount is not matching!');
  }

  //** [step-04] generate a order code
  const order_code = await generatedOrderCode(); // generated bus code

  //** [step-05] create a order and reduce product quantity from product table   
  // TODO: buyer is fake
  // TODO: user_id will be update from auth middleware data

  const result = await Orders.create({
    buyer_id: '657ff528bcc34f2ba044d717',
    user_id: '657ff528bcc34f2ba044d717',
    order_code: order_code,
    order_product_list: order_product_list,
    amount,
    total_amount: amount,
    shipment_address,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order is not created');
  }
  return result;
};

export const OrdersServices = {
  createOrder,
};