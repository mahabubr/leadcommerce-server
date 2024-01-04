"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentServices = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const employe_model_1 = __importDefault(require("../employe/employe.model"));
const order_model_1 = require("../order/order.model");
const products_model_1 = require("../products/products.model");
const store_model_1 = __importDefault(require("../store/store.model"));
const payment_interface_1 = require("./payment.interface");
const payment_model_1 = __importDefault(require("./payment.model"));
// 1. add store balance
// 2. add employees income
// 3. update payment status to complete
// 4. update order status to complete
const createPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const storeAmount = payload.total_amount * 0.8;
    const employeeAmount = payload.total_amount * 0.2;
    const orders = yield order_model_1.Orders.findById(payload.order_id).populate('order_product_list.product_id');
    if (!orders) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Orders not found');
    }
    if (orders.payment_status === 'completed') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'order is already updated');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        for (const orderProduct of orders.order_product_list) {
            // console.log('39', orderProduct);
            const singleProduct = orderProduct.product_id;
            // console.log('53', singleProduct);
            const isExistStore = yield store_model_1.default.findById(singleProduct.store_id);
            if (!isExistStore) {
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'store  is not found!');
            }
            yield store_model_1.default.findByIdAndUpdate(singleProduct.store_id, {
                $set: {
                    balance: isExistStore.balance + storeAmount,
                },
            }, { session });
            yield products_model_1.Products.findByIdAndUpdate(singleProduct._id, {
                $set: {
                    quantity: singleProduct.quantity - orderProduct.product_quantity,
                },
            }, { session });
        }
        const employee = yield employe_model_1.default.findById(orders.buyer_id);
        if (!employee) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Employee not found');
        }
        yield employe_model_1.default.findByIdAndUpdate(orders.buyer_id, {
            $set: {
                income: employee.income + employeeAmount,
            },
        }, {
            session,
            new: true,
        });
        yield order_model_1.Orders.findByIdAndUpdate(payload.order_id, {
            $set: {
                order_status: 'delivered',
                payment_status: payload.payment_status,
            },
        }, {
            session,
            new: true,
        });
        const result = yield payment_model_1.default.create([
            {
                total_amount: payload.total_amount,
                order_id: payload.order_id,
                payment_status: payload.payment_status,
                description: payload.description,
            },
        ], { session });
        yield session.commitTransaction();
        yield session.endSession();
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'payment is not updated ');
        }
        return result[0];
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
// get multiple data from Payment py pagination and searching
const getAllPayment = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: payment_interface_1.PaymentSearchableFields.map(field => ({
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
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield payment_model_1.default.find(whereCondition)
        .populate('order_id')
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield payment_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// * get single Payments
const getSinglePayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.default.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Payment not found');
    }
    return result;
});
// * update single Product
const updatePayment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield payment_model_1.default.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Payment is not found');
    }
    if (payload.order_id) {
        const isExist = yield payment_model_1.default.find({ order_id: payload.order_id });
        if (isExist)
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Order_id is already in used');
    }
    const result = yield payment_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// * delete single product
const deletePayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield payment_model_1.default.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Payment not found');
    }
    const result = yield payment_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.PaymentServices = {
    createPayment,
    getAllPayment,
    getSinglePayment,
    updatePayment,
    deletePayment,
};
