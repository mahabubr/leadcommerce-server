import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IEvent } from './event.interface';
import { Event } from './event.model';
// *--[create event]--
const createEvent = async (payload: IEvent): Promise<IEvent | null> => {
  const result = await Event.create(payload);
  return result;
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
};
