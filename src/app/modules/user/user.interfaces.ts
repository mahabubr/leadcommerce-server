/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { ICustomer } from '../customer/customer.interface';
// import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  // customer: import('mongoose').Types.ObjectId;
  // admin: import('mongoose').Types.ObjectId;
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  admin?: Types.ObjectId | IAdmin;
  customer?: Types.ObjectId | ICustomer;
  // Future;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
