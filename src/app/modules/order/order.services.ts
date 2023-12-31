import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Products } from '../products/products.model';
import { OrderSearchableFields } from './order.constant';
import { IOrders, IOrdersFilters, IOrdersReq } from './order.interface';
import { Orders } from './order.model';
import { generatedOrderCode } from './order.utils';

// * create Order
const createOrder = async (
  payload: IOrdersReq,
  id: string
): Promise<IOrders | null> => {
  // console.log(payload);
  payload.buyer_id = id;
  const { order_product_list, amount, shipment_address, shipment_date } =
    payload;

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
      isExistProduct.quantity <= productQuantity
    ) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'request product details is not matching! 🚀🚀🚀'
      );
    }
  }

  //**[step-02] coupon checking
  // TODO: coupon functionality

  //**[step-03] checking price calculation is right
  let total_price = 0;
  let total_quantity = 0;
  for (const orderProduct of order_product_list) {
    const productPrice = orderProduct.product_price;
    const productQuantity = orderProduct.product_quantity;

    total_price += productPrice * productQuantity;
    total_quantity += productQuantity;
  }

  if (total_price !== amount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'request amount is not matching!');
  }

  //** [step-04] genrate a order code
  const order_code = await generatedOrderCode(); // generated bus code

  //** [step-05]  [reduce product quantity from product table]/part-01 and [create a order]/part-02

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // ** [reduce product quantity from product table]/part-01
    for (const orderProduct of order_product_list) {
      const productId = orderProduct.product_id;
      // const productPrice = orderProduct.product_price;
      const productQuantity = orderProduct.product_quantity;

      const isExistProduct = await Products.findById(productId);

      if (!isExistProduct) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          'update time product is not found!'
        );
      }

      await Products.findByIdAndUpdate(
        productId,
        {
          $set: {
            quantity: isExistProduct.quantity - productQuantity,
          },
        },
        { session }
      );
    }

    // ** [create a order]/part-02
    const result = await Orders.create(
      [
        {
          buyer_id: payload.buyer_id,
          order_code: order_code,
          order_product_list: order_product_list,
          total_items: order_product_list.length,
          total_quantity,
          amount,
          total_amount: amount,
          shipment_address,
          shipment_date,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    await session.endSession();

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Order is not created');
    }
    return result[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

// * get all Orders

const getAllOrders = async (
  filters: Partial<IOrdersFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrders[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: OrderSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Orders.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Orders.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// * get single Orders
const getSingleOrder = async (id: string): Promise<IOrders | null> => {
  const result = await Orders.findById(id);
  return result;
};

// * update single Product
const updateOrder = async (
  id: string,
  payload: Partial<IOrders>
): Promise<IOrders | null> => {
  const isExist = await Orders.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'order is not found');
  }

  const result = await Orders.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        order_status: payload.order_status,
      },
    },
    {
      new: true,
    }
  );

  return result;
};

const updateStatus = async (payload: {
  data: string;
  id: string;
  delivery_email: string;
}) => {
  const data: any = {};
  if (payload.data) {
    data.order_status = payload.data;
  }
  if (payload.delivery_email) {
    data.delivery_email = payload.delivery_email;
  }
  console.log(data, payload.id, 'update status');
  const result = await Orders.updateOne(
    { _id: payload.id },
    {
      $set: {
        ...data,
      },
    }
  );

  return result;
};

// * delete single product
const deleteOrder = async (id: string): Promise<IOrders | null> => {
  const isExist = await Orders.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  const result = await Orders.findByIdAndDelete(id);
  return result;
};

const getAllOrdersForStore = async (
  filters: Partial<IOrdersFilters>,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IOrders[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: OrderSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Orders.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Orders.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// const getAllOrdersForStore = async (
//   filters: Partial<IOrdersFilters>,
//   paginationOptions: IPaginationOptions,
//   store_id: string
// ): Promise<IOrders[]> => {
//   console.log(store_id);

//   const pipeline = [
//     {
//       $unwind: '$order_product_list', // Unwind the order_product_list array
//     },
//     {
//       $lookup: {
//         from: 'products', // Product Schema for joining
//         let: {
//           productId: '$order_product_list.product_id',
//           store_id: store_id,
//         },
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $and: [
//                   { $eq: ['$_id', '$$productId'] }, // Match product_id
//                   { $eq: ['$store_id', '$$store_id'] }, // Match store_id
//                 ],
//               },
//             },
//           },
//         ],
//         as: 'product_details',
//       },
//     },
//   ];

//   const storeOrders = await Orders.aggregate(
//     pipeline as PipelineStage[]
//   ).exec();

//   return storeOrders;
// };
const getAllOrdersForDeliveryMan = async (
  filters: Partial<IOrdersFilters>,
  paginationOptions: IPaginationOptions,
  delivery_email: string
): Promise<IGenericResponse<IOrders[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  console.log(delivery_email);

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: OrderSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (delivery_email) {
    andCondition.push({
      delivery_email: {
        $eq: delivery_email,
      },
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Orders.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Orders.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const OrdersServices = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  updateStatus,
  getAllOrdersForStore,
  getAllOrdersForDeliveryMan,
};
