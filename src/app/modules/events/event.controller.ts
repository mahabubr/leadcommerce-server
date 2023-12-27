import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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
};
