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
exports.OrdersServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const products_model_1 = require("../products/products.model");
const order_constant_1 = require("./order.constant");
const order_model_1 = require("./order.model");
const order_utils_1 = require("./order.utils");
// * create Order
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
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
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Product is not found!');
    }
    for (const orderProduct of order_product_list) {
        const productId = orderProduct.product_id;
        const productPrice = orderProduct.product_price;
        const productQuantity = orderProduct.product_quantity;
        if (typeof productId !== 'string' ||
            typeof orderProduct.product_price !== 'number') {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'request product details is not matching!');
        }
        const isExistProduct = yield products_model_1.Products.findById(productId);
        if (!isExistProduct ||
            isExistProduct.price !== productPrice ||
            isExistProduct.quantity < productQuantity) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'request product details is not matching!');
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
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'request amount is not matching!');
    }
    //** [step-04] generate a order code
    const order_code = yield (0, order_utils_1.generatedOrderCode)(); // generated bus code
    //** [step-05]  [reduce product quantity from product table]/part-01 and [create a order]/part-02
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // ** [reduce product quantity from product table]/part-01
        for (const orderProduct of order_product_list) {
            const productId = orderProduct.product_id;
            // const productPrice = orderProduct.product_price;
            const productQuantity = orderProduct.product_quantity;
            const isExistProduct = yield products_model_1.Products.findById(productId);
            if (!isExistProduct) {
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'update time product is not found!');
            }
            yield products_model_1.Products.findByIdAndUpdate(productId, {
                $set: {
                    quantity: isExistProduct.quantity - productQuantity,
                },
            }, { session });
        }
        // ** [create a order]/part-02
        // TODO: buyer is fake
        // TODO: user_id will be update from auth middleware data
        const result = yield order_model_1.Orders.create([
            {
                buyer_id: '657ff528bcc34f2ba044d717',
                user_id: '657ff528bcc34f2ba044d717',
                order_code: order_code,
                order_product_list: order_product_list,
                total_items: order_product_list.length,
                total_quantity,
                amount,
                total_amount: amount,
                shipment_address,
            },
        ], { session });
        yield session.commitTransaction();
        yield session.endSession();
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Order is not created');
        }
        return result[0];
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
// * get all Orders
const getAllOrders = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: order_constant_1.OrderSearchableFields.map(field => ({
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
    const result = yield order_model_1.Orders.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield order_model_1.Orders.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// * get single Orders
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Orders.findById(id)
        .populate({
        path: 'user_id',
        // select: 'from to distance',
    })
        .populate({
        path: 'buyer_id',
    })
        .populate({
        path: 'buyer_id',
    })
        .populate('payment_id')
        .populate('shipment_id')
        .populate({
        path: 'order_product_list.product_id',
        // select: '*',   // TODO: retrieved all products info/fields as the requirements
    });
    return result;
});
// * update single Product
const updateOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield order_model_1.Orders.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'order is not found');
    }
    const result = yield order_model_1.Orders.findOneAndUpdate({ _id: id }, {
        $set: {
            order_status: payload.order_status,
        },
    }, {
        new: true,
    });
    return result;
});
// * delete single product
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield order_model_1.Orders.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    const result = yield order_model_1.Orders.findByIdAndDelete(id);
    return result;
});
exports.OrdersServices = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
};