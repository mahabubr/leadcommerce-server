/* eslint-disable @typescript-eslint/no-explicit-any */
import { PipelineStage } from 'mongoose';
import Admin from '../admin/admin.model';
import Employe from '../employees/employees.model';
import { Orders } from '../order/order.model';
import Payment from '../payment/payment.model';
import { Products } from '../products/products.model';
import Store from '../store/store.model';

const getUserDailySingUp = async () => {
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

  const store = await Store.aggregate(pipeline as PipelineStage[]).exec();
  const admin = await Admin.aggregate(pipeline as PipelineStage[]).exec();
  const employees = await Employe.aggregate(pipeline as PipelineStage[]).exec();

  const userInfo = [...store, ...admin, ...employees];

  return userInfo.length;
};

const getDailyOrders = async () => {
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

  const orders = await Orders.aggregate(pipeline as PipelineStage[]).exec();

  return orders.length;
};

const getDailyRevenue = async () => {
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

  const payment = await Payment.aggregate(pipeline as PipelineStage[]).exec();

  let revenue = 0;

  for (const rev of payment) {
    revenue += rev.total_amount;
  }

  return revenue;
};

const getDailyProducts = async () => {
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

  const product = await Products.aggregate(pipeline as PipelineStage[]).exec();

  return product.length;
};

const getMonthlyOrdersCurrentYear = async () => {
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

  const orders = await Orders.aggregate(pipeline).exec();

  const monthlyCounts: any = {};
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
};

const getLastFourWeekdaysOrders = async () => {
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

    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59
    );

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

    const dailyOrders = await Orders.aggregate(pipeline).exec();

    if (dailyOrders.length === 0) {
      ordersData.push({
        day: weekdays[currentDate.getDay()],
        date: currentDate.toDateString(),
        count: 0,
      });
    } else {
      ordersData.push(dailyOrders[0]);
    }
  }

  return ordersData;
};

const getYearlyOrders = async () => {
  const currentYear = new Date().getFullYear();
  const last5Years = Array.from(
    { length: 5 },
    (_, index) => currentYear - index
  );

  const results = [];

  for (const year of last5Years) {
    const startDate = new Date(year, 0, 1); // Start date of the year
    const endDate = new Date(year, 11, 31, 23, 59, 59); // End date of the year

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

    const orders = await Orders.aggregate(pipeline).exec();

    if (orders.length > 0) {
      const yearlyCount = orders[0].count; // Assuming only one result per year
      results.push({ year, count: yearlyCount });
    } else {
      results.push({ year, count: 0 });
    }
  }

  return results;
};

export const DashboardUtils = {
  getUserDailySingUp,
  getDailyOrders,
  getDailyRevenue,
  getDailyProducts,
  getMonthlyOrdersCurrentYear,
  getLastFourWeekdaysOrders,
  getYearlyOrders,
};
