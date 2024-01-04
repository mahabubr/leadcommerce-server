import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationConstants';
import catAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IFaq, faqFilterableFields } from './faq.interface';
import { faqServices } from './faq.service';

const createFaq = catAsync(async (req: Request, res: Response) => {
  const { ...FaqData } = req.body;

  const result = await faqServices.createFaq(FaqData);

  sendResponse<IFaq | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faqs created successfully',
    data: result,
  });
});

// get multiple data from database
const getAllFaq = catAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, faqFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await faqServices.getAllFaq(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faqs retrived successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleFaq = catAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await faqServices.getSingleFaq(id);

  sendResponse<IFaq | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq Fetched successfully',
    data: result,
  });
});

// * update Faq

const updateFaq = catAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const updatedData = req.body;
  const result = await faqServices.updateFaq(id, updatedData);

  sendResponse<IFaq | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq updated successfully',
    data: result,
  });
});

// * delete single Faq
const deleteFaq = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await faqServices.deleteFaq(id);

  sendResponse<IFaq | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq deleted successfully',
    data: result,
  });
});

export const faqController = {
  createFaq,
  getAllFaq,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
