import bcrypt from 'bcrypt';
import { IStores } from './store.interface';
import Store from './store.model';

const createStore = async (payload: IStores): Promise<IStores> => {
  const {
    password,
    email,
    name,
    contact_no,
    earning,
    location,
    logo,
    owner_name,
    refund,
    total_orders,
  } = payload;

  const hash = await bcrypt.hash(password, 12);

  const payloadData = {
    password: hash,
    email,
    name,
    contact_no,
    earning,
    location,
    logo,
    owner_name,
    refund,
    total_orders,
  };

  const result = await Store.create(payloadData);
  return result;
};

const getAllStore = async (): Promise<IStores[]> => {
  const result = await Store.find();
  return result;
};

export const StoreServices = {
  createStore,
  getAllStore,
};
