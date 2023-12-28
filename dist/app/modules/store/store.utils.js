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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerDashboardUtils = void 0;
const order_model_1 = require("../order/order.model");
// TODO: implement store search
const getPendingOrdersData = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear() - 1, 0, 1);
    const endOfYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999);
    const pipeline = [
        {
            $match: {
                order_status: { $in: ['pending'] },
                createdAt: { $gte: startOfYear, $lte: endOfYear },
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                year: '$_id.year',
                month: '$_id.month',
                count: 1,
            },
        },
        {
            $sort: {
                year: 1,
                month: -1,
            },
        },
    ];
    const store = yield order_model_1.Orders.aggregate(pipeline).exec();
    const transformedResult = store.map(entry => ({
        year: entry.year,
        month: entry.month,
        count: entry.count,
    }));
    const counts = transformedResult.map(item => item.count);
    return counts;
});
const getDeliveredOrdersData = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear() - 1, 0, 1);
    const endOfYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999);
    const pipeline = [
        {
            $match: {
                order_status: { $in: ['delivered'] },
                createdAt: { $gte: startOfYear, $lte: endOfYear },
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                year: '$_id.year',
                month: '$_id.month',
                count: 1,
            },
        },
        {
            $sort: {
                year: 1,
                month: -1,
            },
        },
    ];
    const store = yield order_model_1.Orders.aggregate(pipeline).exec();
    const transformedResult = store.map(entry => ({
        year: entry.year,
        month: entry.month,
        count: entry.count,
    }));
    const counts = transformedResult.map(item => item.count);
    return counts;
});
const getRefundsOrdersData = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear() - 1, 0, 1);
    const endOfYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999);
    const pipeline = [
        {
            $match: {
                order_status: { $in: ['refunds'] },
                createdAt: { $gte: startOfYear, $lte: endOfYear },
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                year: '$_id.year',
                month: '$_id.month',
                count: 1,
            },
        },
        {
            $sort: {
                year: 1,
                month: -1,
            },
        },
    ];
    const store = yield order_model_1.Orders.aggregate(pipeline).exec();
    const transformedResult = store.map(entry => ({
        year: entry.year,
        month: entry.month,
        count: entry.count,
    }));
    const counts = transformedResult.map(item => item.count);
    return counts;
});
const totalRefunds = () => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = [
        {
            $match: {
                order_status: 'refunds',
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                total: 1,
            },
        },
    ];
    const totalRefundsResult = yield order_model_1.Orders.aggregate(pipeline).exec();
    return totalRefundsResult[0];
});
const totalEarning = () => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = [
        {
            $match: {
                order_status: 'delivered',
            },
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$total_amount' },
            },
        },
        {
            $project: {
                _id: 0,
                totalAmount: 1,
            },
        },
    ];
    const totalRefundsResult = yield order_model_1.Orders.aggregate(pipeline).exec();
    return totalRefundsResult[0];
});
const totalOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = [
        {
            $match: {
                order_status: { $in: ['delivered', 'pending'] },
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                total: 1,
            },
        },
    ];
    const totalRefundsResult = yield order_model_1.Orders.aggregate(pipeline).exec();
    return totalRefundsResult[0];
});
exports.SellerDashboardUtils = {
    getPendingOrdersData,
    getDeliveredOrdersData,
    getRefundsOrdersData,
    totalRefunds,
    totalEarning,
    totalOrders,
};
