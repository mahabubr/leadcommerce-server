/* eslint-disable @typescript-eslint/no-explicit-any */
import { PipelineStage } from 'mongoose';
import { Orders } from '../order/order.model';

// TODO: implement store search
const getPendingOrdersData = async () => {
  const currentDate = new Date();

  const startOfYear = new Date(currentDate.getFullYear() - 1, 0, 1);
  const endOfYear = new Date(
    currentDate.getFullYear(),
    11,
    31,
    23,
    59,
    59,
    999
  );

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

  const store = await Orders.aggregate(pipeline as PipelineStage[]).exec();

  const transformedResult = store.map(entry => ({
    year: entry.year,
    month: entry.month,
    count: entry.count,
  }));

  const counts = transformedResult.map(item => item.count);
  return counts;
};

const getDeliveredOrdersData = async () => {
  const currentDate = new Date();

  const startOfYear = new Date(currentDate.getFullYear() - 1, 0, 1);
  const endOfYear = new Date(
    currentDate.getFullYear(),
    11,
    31,
    23,
    59,
    59,
    999
  );

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

  const store = await Orders.aggregate(pipeline as PipelineStage[]).exec();

  const transformedResult = store.map(entry => ({
    year: entry.year,
    month: entry.month,
    count: entry.count,
  }));

  const counts = transformedResult.map(item => item.count);
  return counts;
};

const getRefundsOrdersData = async () => {
  const currentDate = new Date();

  const startOfYear = new Date(currentDate.getFullYear() - 1, 0, 1);
  const endOfYear = new Date(
    currentDate.getFullYear(),
    11,
    31,
    23,
    59,
    59,
    999
  );

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

  const store = await Orders.aggregate(pipeline as PipelineStage[]).exec();

  const transformedResult = store.map(entry => ({
    year: entry.year,
    month: entry.month,
    count: entry.count,
  }));

  const counts = transformedResult.map(item => item.count);
  return counts;
};

const totalRefunds = async () => {
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
  const totalRefundsResult = await Orders.aggregate(
    pipeline as PipelineStage[]
  ).exec();
  return totalRefundsResult[0];
};

const totalEarning = async () => {
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
  const totalRefundsResult = await Orders.aggregate(
    pipeline as PipelineStage[]
  ).exec();
  return totalRefundsResult[0];
};

const totalOrders = async () => {
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
  const totalRefundsResult = await Orders.aggregate(
    pipeline as PipelineStage[]
  ).exec();
  return totalRefundsResult[0];
};

export const SellerDashboardUtils = {
  getPendingOrdersData,
  getDeliveredOrdersData,
  getRefundsOrdersData,
  totalRefunds,
  totalEarning,
  totalOrders,
};
