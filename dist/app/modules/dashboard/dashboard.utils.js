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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardUtils = void 0;
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const category_model_1 = require("../category/category.model");
const order_model_1 = require("../order/order.model");
const payment_model_1 = __importDefault(require("../payment/payment.model"));
const products_model_1 = require("../products/products.model");
const store_model_1 = __importDefault(require("../store/store.model"));
const employe_model_1 = __importDefault(require("../employe/employe.model"));
const getUserDailySingUp = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const pipeline = [
        {
            $match: {
                createdAt: {
                    $gte: today,
                    $lt: tomorrow,
                },
            },
        },
        {
            $project: {
                createdAt: 1,
            },
        },
        {
            $sort: {
                createdAt: 1,
            },
        },
    ];
    const store = yield store_model_1.default.aggregate(pipeline).exec();
    const admin = yield admin_model_1.default.aggregate(pipeline).exec();
    const employees = yield employe_model_1.default.aggregate(pipeline).exec();
    const userInfo = [...store, ...admin, ...employees];
    return userInfo.length;
});
const getDailyOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const pipeline = [
        {
            $match: {
                createdAt: {
                    $gte: today,
                    $lt: tomorrow,
                },
            },
        },
        {
            $project: {
                createdAt: 1,
            },
        },
        {
            $sort: {
                createdAt: 1,
            },
        },
    ];
    const orders = yield order_model_1.Orders.aggregate(pipeline).exec();
    return orders.length;
});
const getDailyRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const pipeline = [
        {
            $match: {
                createdAt: {
                    $gte: today,
                    $lt: tomorrow,
                },
            },
        },
        {
            $project: {
                total_amount: 1,
                createdAt: 1,
            },
        },
        {
            $sort: {
                createdAt: 1,
            },
        },
    ];
    const payment = yield payment_model_1.default.aggregate(pipeline).exec();
    let revenue = 0;
    for (const rev of payment) {
        revenue += rev.total_amount;
    }
    return revenue;
});
const getDailyProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const pipeline = [
        {
            $match: {
                createdAt: {
                    $gte: today,
                    $lt: tomorrow,
                },
            },
        },
        {
            $project: {
                createdAt: 1,
            },
        },
        {
            $sort: {
                createdAt: 1,
            },
        },
    ];
    const product = yield products_model_1.Products.aggregate(pipeline).exec();
    return product.length;
});
const getMonthlyOrdersCurrentYear = () => __awaiter(void 0, void 0, void 0, function* () {
    const curDate = new Date();
    const currentYear = curDate.getFullYear();
    const startDate = new Date(currentYear, curDate.getMonth(), 1);
    const endDate = new Date(currentYear, curDate.getMonth() + 1, 0, 23, 59, 59);
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const pipeline = [
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
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
                month: {
                    $arrayElemAt: [monthNames, { $subtract: ['$_id.month', 1] }],
                },
                year: '$_id.year',
                count: 1,
            },
        },
    ];
    const orders = yield order_model_1.Orders.aggregate(pipeline).exec();
    const monthlyCounts = {};
    monthNames.forEach(month => {
        monthlyCounts[month] = 0;
    });
    orders.forEach(order => {
        monthlyCounts[order.month] = order.count;
    });
    const result = monthNames.map(month => ({
        month,
        year: currentYear,
        count: monthlyCounts[month],
    }));
    return result;
});
const getLastFourWeekdaysOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const curDate = new Date();
    const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const currentDayIndex = curDate.getDay();
    const lastMonday = new Date(curDate);
    lastMonday.setDate(curDate.getDate() - currentDayIndex - 7);
    const ordersData = [];
    for (let i = 0; i < 4; i++) {
        const currentDate = new Date(lastMonday);
        currentDate.setDate(lastMonday.getDate() + i);
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
        const pipeline = [
            {
                $match: {
                    createdAt: {
                        $gte: startOfDay,
                        $lte: endOfDay,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    day: weekdays[currentDate.getDay()],
                    date: currentDate.toDateString(),
                    count: 1,
                },
            },
        ];
        const dailyOrders = yield order_model_1.Orders.aggregate(pipeline).exec();
        if (dailyOrders.length === 0) {
            ordersData.push({
                day: weekdays[currentDate.getDay()],
                date: currentDate.toDateString(),
                count: 0,
            });
        }
        else {
            ordersData.push(dailyOrders[0]);
        }
    }
    return ordersData;
});
const getYearlyOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentYear = new Date().getFullYear();
    const last5Years = Array.from({ length: 5 }, (_, index) => currentYear - index);
    const results = [];
    for (const year of last5Years) {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31, 23, 59, 59);
        const pipeline = [
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: { $year: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    year: '$_id',
                    count: 1,
                },
            },
        ];
        const orders = yield order_model_1.Orders.aggregate(pipeline).exec();
        if (orders.length > 0) {
            const yearlyCount = orders[0].count;
            results.push({ year, count: yearlyCount });
        }
        else {
            results.push({ year, count: 0 });
        }
    }
    return results;
});
const getUserWeeklySignUp = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Calculate the date of a week ago
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    weekAgo.setHours(0, 0, 0, 0);
    const pipeline = [
        {
            $match: {
                createdAt: {
                    $gte: weekAgo,
                    $lt: today, // Today's date
                },
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                    day: { $dayOfMonth: '$createdAt' },
                },
                count: { $sum: 1 }, // Count documents for each day
            },
        },
        {
            $sort: {
                '_id.year': 1,
                '_id.month': 1,
                '_id.day': 1,
            },
        },
    ];
    const store = yield store_model_1.default.aggregate(pipeline).exec();
    const admin = yield admin_model_1.default.aggregate(pipeline).exec();
    const employees = yield employe_model_1.default.aggregate(pipeline).exec();
    const userCounts = [...store, ...admin, ...employees];
    const dateCursor = new Date(weekAgo);
    const endDate = new Date(today);
    const weeklyCounts = [];
    while (dateCursor < endDate) {
        const found = userCounts.find(count => count._id.year === dateCursor.getFullYear() &&
            count._id.month === dateCursor.getMonth() + 1 &&
            count._id.day === dateCursor.getDate());
        const dateInfo = {
            date: dateCursor.toISOString().split('T')[0],
            dayName: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateCursor),
        };
        if (found) {
            weeklyCounts.push(Object.assign(Object.assign({}, dateInfo), { count: found.count }));
        }
        else {
            weeklyCounts.push(Object.assign(Object.assign({}, dateInfo), { count: 0 }));
        }
        dateCursor.setDate(dateCursor.getDate() + 1);
    }
    return weeklyCounts;
});
const getOrderStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const pending = yield order_model_1.Orders.find({ order_status: 'pending' });
    const delivered = yield order_model_1.Orders.find({ order_status: 'delivered' });
    const cancel = yield order_model_1.Orders.find({ order_status: 'cancel' });
    const paused = yield order_model_1.Orders.find({ order_status: 'paused' });
    return {
        pending: pending.length,
        delivered: delivered.length,
        cancel: cancel.length,
        paused: paused.length,
    };
});
const getUserByCountry = () => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = [
        {
            $group: {
                _id: '$country',
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                country: '$_id',
                count: 1,
            },
        },
    ];
    const store = yield store_model_1.default.aggregate(pipeline).exec();
    const admin = yield admin_model_1.default.aggregate(pipeline).exec();
    const employees = yield employe_model_1.default.aggregate(pipeline).exec();
    const userCounts = [...store, ...admin, ...employees];
    return userCounts;
});
const getTopProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.aggregate([
        { $sort: { price: -1 } },
        { $limit: 5 },
        {
            $project: {
                image: 1,
                productName: 1,
                price: 1,
                quantity: 1,
                fullDescription: 1,
            },
        },
    ]);
    return result;
});
const getTopCatagories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.aggregate([
        { $sort: { createdAt: -1 } },
        { $limit: 5 },
        {
            $project: {
                name: 1,
            },
        },
    ]);
    return result;
});
const getTopOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Orders.aggregate([
        { $sort: { amount: -1 } },
        { $limit: 5 },
        {
            $project: {
                order_code: 1,
                total_items: 1,
                amount: 1,
                payment_status: 1,
                shipment_status: 1,
            },
        },
    ]);
    return result;
});
exports.DashboardUtils = {
    getUserDailySingUp,
    getDailyOrders,
    getDailyRevenue,
    getDailyProducts,
    getMonthlyOrdersCurrentYear,
    getLastFourWeekdaysOrders,
    getYearlyOrders,
    getUserWeeklySignUp,
    getOrderStats,
    getUserByCountry,
    getTopProducts,
    getTopCatagories,
    getTopOrders,
};
