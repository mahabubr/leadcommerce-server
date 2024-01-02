import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import Employe from '../employees/employees.model';
import { Orders } from '../order/order.model';
import { IProducts } from '../products/products.interface';
import { Products } from '../products/products.model';
import Store from '../store/store.model';
import {
  IPayment,
  IPaymentFilters,
  PaymentSearchableFields,
} from './payment.interface';
import Payment from './payment.model';

// 1. add store balance
// 2. add employees income
// 3. update payment status to complete
// 4. update order status to complete

const createPayment = async (payload: IPayment): Promise<IPayment> => {
  const storeAmount = payload.total_amount * 0.8;
  const employeeAmount = payload.total_amount * 0.2;
  const orders = await Orders.findById(payload.order_id).populate(
    'order_product_list.product_id'
  );
  const session = await mongoose.startSession();
  if (!orders) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Orders not found');
  }

  try {
    session.startTransaction();

    for (const orderProduct of orders.order_product_list) {
      console.log('39', orderProduct);
      const singleProduct = orderProduct.product_id as Partial<IProducts>;
      console.log('53', singleProduct);
      const isExistStore = await Store.findById(singleProduct.store_id);

      if (!isExistStore) {
        throw new ApiError(httpStatus.NOT_FOUND, 'store  is not found!');
      }

      await Store.findByIdAndUpdate(
        singleProduct.store_id,
        {
          $set: {
            balance: isExistStore.balance + storeAmount,
          },
        },
        { session }
      );

      await Products.findByIdAndUpdate(
        singleProduct._id,
        {
          $set: {
            quantity: singleProduct.quantity! - orderProduct.product_quantity,
          },
        },
        { session }
      );
    }

    const employee = await Employe.findById(orders.buyer_id);
    if (!employee) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Employee not found');
    }
    await Employe.findByIdAndUpdate(
      orders.buyer_id,
      {
        $set: {
          income: employee.income + employeeAmount,
        },
      },
      {
        session,
        new: true,
      }
    );
    await Orders.findByIdAndUpdate(
      payload.order_id,
      {
        $set: {
          order_status: 'delivered',
          payment_status: payload.payment_status,
        },
      },
      {
        session,
        new: true,
      }
    );

    const result = await Payment.create(
      [
        {
          total_amount: payload.total_amount,
          order_id: payload.order_id,
          payment_status: payload.payment_status,
          description: payload.description,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    await session.endSession();

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'payment is not updated ');
    }
    return result[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

// get multiple data from Payment py pagination and searching
const getAllPayment = async (
  filters: Partial<IPaymentFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPayment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: PaymentSearchableFields.map(field => ({
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

  const result = await Payment.find(whereCondition)
    .populate('order_id')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Payment.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// * get single Payments
const getSinglePayment = async (id: string): Promise<IPayment | null> => {
  const result = await Payment.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return result;
};

// * update single Product
const updatePayment = async (
  id: string,
  payload: Partial<IPayment>
): Promise<IPayment | null> => {
  const isExist = await Payment.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment is not found');
  }

  if (payload.order_id) {
    const isExist = await Payment.find({ order_id: payload.order_id });
    if (isExist)
      throw new ApiError(httpStatus.CONFLICT, 'Order_id is already in used');
  }

  const result = await Payment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// * delete single product
const deletePayment = async (id: string): Promise<IPayment | null> => {
  const isExist = await Payment.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  const result = await Payment.findByIdAndDelete(id);
  return result;
};

export const PaymentServices = {
  createPayment,
  getAllPayment,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
