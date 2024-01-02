import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cloudinary from '../../../config/cloudinary';
import { paginationFields } from '../../../constants/paginationConstants';
import catAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ProductFilterableFields } from './products.constant';
import { IProducts } from './products.interface';
import { ProductsServices } from './products.services';

// * create product
const createProduct = catAsync(async (req: Request, res: Response) => {
  const { ...productData } = req.body;
  const decoded = jwt.decode(req.headers.authorization as string) as JwtPayload;

  if (req.file) {
    const uploadedImage = await cloudinary.uploader.upload(req.file?.path);
    const avatar = {
      avatar: uploadedImage.secure_url,
      avatar_public_url: uploadedImage.public_id,
    };
    productData.image = avatar;
  }
  
  const result = await ProductsServices.createProduct(productData, decoded.id);

  sendResponse<IProducts | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

// * get all product
const getAllProducts = catAsync(async (req: Request, res: Response) => {
  const decoded = jwt.decode(req.headers.authorization as string) as JwtPayload;
  const filters = pick(req.query, ProductFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProductsServices.getAllProducts(
    filters,
    paginationOptions,
    decoded.id
  );

  sendResponse<IProducts[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

// * get single product
const getSingleProduct = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductsServices.getSingleProduct(id);

  sendResponse<IProducts | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Fetched successfully',
    data: result,
  });
});
// * get all store product
const getAllStoreProduct = catAsync(async (req: Request, res: Response) => {
  const decoded = jwt.decode(req.headers.authorization as string) as JwtPayload;
  const result = await ProductsServices.getAllStoreProduct(decoded.id);

  sendResponse<IProducts[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Fetched successfully',
    data: result,
  });
});

// * update product

const updateProduct = catAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;

  if (req.file) {
    const uploadedImage = await cloudinary.uploader.upload(req.file?.path);
    const avatar = {
      avatar: uploadedImage.secure_url,
      avatar_public_url: uploadedImage.public_id,
    };
    updatedData.image = avatar;
  }

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
  getAllProducts,
  updateProduct,
  getAllStoreProduct,
  deleteProduct,
  getSingleProduct,
};
