import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IProducts } from './products.interface';
import { ProductsServices } from './products.services';

// * create product
const createProduct = catAsync(async (req: Request, res: Response) => {
  const { ...productData } = req.body;

  const result = await ProductsServices.createProduct(productData);

  sendResponse<IProducts | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

// * update product

const updateProduct = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await ProductsServices.updateProduct(id, updatedData);

  sendResponse<IProducts | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

// * delete single product
const deleteProduct = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductsServices.deleteProduct(id);

  sendResponse<IProducts | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductsController = {
  createProduct,
  updateProduct,
  deleteProduct,
};
