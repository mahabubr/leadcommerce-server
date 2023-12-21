import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationConstants';
import catAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IShipment, ShipmentFilterableFields } from './shipment.interface';
import { ShipmentServices } from './shipment.service';

const createShipment = catAsync(async (req: Request, res: Response) => {
  const { ...ShipmentData } = req.body;

  const result = await ShipmentServices.createShipment(ShipmentData);

  sendResponse<IShipment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shipments created successfully',
    data: result,
  });
});

// get multiple data from database
const getAllShipment = catAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ShipmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ShipmentServices.getAllShipment(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shipments retrived successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleShipment = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ShipmentServices.getSingleShipment(id);

  sendResponse<IShipment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shipment Fetched successfully',
    data: result,
  });
});

// * update Shipment

const updateShipment = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await ShipmentServices.updateShipment(id, updatedData);

  sendResponse<IShipment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shipment updated successfully',
    data: result,
  });
});

// * delete single Shipment
const deleteShipment = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ShipmentServices.deleteShipment(id);

  sendResponse<IShipment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shipment deleted successfully',
    data: result,
  });
});

export const ShipmentController = {
  createShipment,
  getAllShipment,
  getSingleShipment,
  updateShipment,
  deleteShipment,
};
