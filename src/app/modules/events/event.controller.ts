import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationConstants';
import catAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { EventFilterableField } from './event.constant';
import { IEvent } from './event.interface';
import { EventService } from './event.service';

// *--[create event]--
const createEvent = catAsync(async (req: Request, res: Response) => {
  const { ...EventData } = req.body;
  const result = await EventService.createEvent(EventData);
  sendResponse<IEvent | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event created successfully',
    data: result,
  });
});

const getAllEvents = catAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, EventFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await EventService.getAllEvents(filters, paginationOptions);

  sendResponse<IEvent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events retrieved successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

// *--[get single event]--
const getSingleEvent = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventService.getSingleEvent(id);

  sendResponse<IEvent | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Fetched successfully',
    data: result,
  });
});
// *--[update single event]--
const updateEvent = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;

  const result = await EventService.updateEvent(id, updatedData);
  sendResponse<IEvent | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event updated successfully',
    data: result,
  });
});
// *--[delete single event]--
const deleteEvent = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventService.deleteEvent(id);
  sendResponse<IEvent | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event deleted successfully',
    data: result,
  });
});

export const EventController = {
  createEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
};
