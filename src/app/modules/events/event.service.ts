/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { EventSearchableField } from './event.constant';
import { IEvent } from './event.interface';
import { Event } from './event.model';
// *--[create event]--
const createEvent = async (payload: IEvent): Promise<IEvent | null> => {
  const result = await Event.create(payload);
  return result;
};

const getAllEvents = async (
  filters: any,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IEvent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: EventSearchableField.map(field => ({
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

  const result = await Event.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Event.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// * get single product
const getSingleEvent = async (id: string): Promise<IEvent | null> => {
  const result = await Event.findById(id);
  return result;
};

// *--[update single event]--
const updateEvent = async (
  id: string,
  payload: Partial<IEvent>
): Promise<IEvent | null> => {
  const isExist = await Event.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'event is not exist');
  }

  const result = await Event.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// *--[delete single event]--
const deleteEvent = async (id: string): Promise<IEvent | null | undefined> => {
  const isExist = await Event.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'event is not exist');
  }
  const result = await Event.findByIdAndDelete(id, {
    new: true,
  });
  return result;
};

export const EventService = {
  createEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
};
