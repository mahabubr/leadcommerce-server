import { IProducts } from './products.interface';
import { Products } from './products.model';

// * create product
const createProduct = async (payload: IProducts): Promise<IProducts | null> => {
  const result = await Products.create(payload);
  return result;
};

// * get single product
const getSingleProduct = async (id: string): Promise<IProducts | null> => {
  const result = await Products.findById(id);
  return result;
};

// * update single product
const updateProduct = async (
  id: string,
  payload: Partial<IProducts>
): Promise<IProducts | null> => {
  const result = await Products.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// * delete single product
const deleteProduct = async (id: string): Promise<IProducts | null> => {
  const result = await Products.findByIdAndDelete(id);
  return result;
};

export const ProductsServices = {
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};
