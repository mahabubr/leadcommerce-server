import { DashboardUtils } from './dashboard.utils';

const getDashboardInfo = async () => {
  const userDailySingUp = await DashboardUtils.getUserDailySingUp();
  const dailyOrders = await DashboardUtils.getDailyOrders();
  const dailyRevenue = await DashboardUtils.getDailyRevenue();
  const dailyProducts = await DashboardUtils.getDailyProducts();

  const monthlyOrders = await DashboardUtils.getMonthlyOrdersCurrentYear();
  const weeklyOrders = await DashboardUtils.getLastFourWeekdaysOrders();
  const yearlyOrders = await DashboardUtils.getYearlyOrders();

  const info = {
    userDailySingUp,
    dailyOrders,
    dailyRevenue,
    dailyProducts,
    ordersChart: {
      monthlyOrders,
      weeklyOrders,
      yearlyOrders,
    },
  };

  return info;
};

export const DashboardServices = {
  getDashboardInfo,
};
