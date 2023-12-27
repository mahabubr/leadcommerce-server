import { DashboardUtils } from './dashboard.utils';

const getDashboardInfo = async () => {
  const userDailySingUp = await DashboardUtils.getUserDailySingUp();
  const dailyOrders = await DashboardUtils.getDailyOrders();
  const dailyRevenue = await DashboardUtils.getDailyRevenue();
  const dailyProducts = await DashboardUtils.getDailyProducts();
  const monthlyOrders = await DashboardUtils.getMonthlyOrdersCurrentYear();
  const weeklyOrders = await DashboardUtils.getLastFourWeekdaysOrders();
  const yearlyOrders = await DashboardUtils.getYearlyOrders();
  const weeklySignUp = await DashboardUtils.getUserWeeklySignUp();
  const ordersStats = await DashboardUtils.getOrderStats();
  const userByCountry = await DashboardUtils.getUserByCountry();
  const topProduct = await DashboardUtils.getTopProducts();
  const topCategory = await DashboardUtils.getTopCatagories();
  const topOrders = await DashboardUtils.getTopOrders();

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
};

export const DashboardServices = {
  getDashboardInfo,
};
