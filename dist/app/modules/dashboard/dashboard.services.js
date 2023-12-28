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
exports.DashboardServices = void 0;
const dashboard_utils_1 = require("./dashboard.utils");
const getDashboardInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const userDailySingUp = yield dashboard_utils_1.DashboardUtils.getUserDailySingUp();
    const dailyOrders = yield dashboard_utils_1.DashboardUtils.getDailyOrders();
    const dailyRevenue = yield dashboard_utils_1.DashboardUtils.getDailyRevenue();
    const dailyProducts = yield dashboard_utils_1.DashboardUtils.getDailyProducts();
    const monthlyOrders = yield dashboard_utils_1.DashboardUtils.getMonthlyOrdersCurrentYear();
    const weeklyOrders = yield dashboard_utils_1.DashboardUtils.getLastFourWeekdaysOrders();
    const yearlyOrders = yield dashboard_utils_1.DashboardUtils.getYearlyOrders();
    const weeklySignUp = yield dashboard_utils_1.DashboardUtils.getUserWeeklySignUp();
    const ordersStats = yield dashboard_utils_1.DashboardUtils.getOrderStats();
    const userByCountry = yield dashboard_utils_1.DashboardUtils.getUserByCountry();
    const topProduct = yield dashboard_utils_1.DashboardUtils.getTopProducts();
    const topCategory = yield dashboard_utils_1.DashboardUtils.getTopCatagories();
    const topOrders = yield dashboard_utils_1.DashboardUtils.getTopOrders();
    const info = {
        userDailySingUp,
        dailyOrders,
        dailyRevenue,
        dailyProducts,
        ordersChart: {
            monthlyOrders,
            weeklyOrders,
            yearlyOrders,
            weeklySignUp,
            ordersStats,
            userByCountry,
            topProduct,
            topCategory,
            topOrders,
        },
    };
    return info;
});
exports.DashboardServices = {
    getDashboardInfo,
};
