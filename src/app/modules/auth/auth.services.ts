import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { JwtHelper } from '../../helpers/jwtHelpers';
import Store from '../store/store.model';
import { IAuth } from './auth.interface';

const loginUser = async (payload: IAuth) => {
  const { email, password } = payload;

  const isExist = await Store.findOne({
    email: email,
  });

  if (!isExist) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Store not found');
  }

  const isPassMatched = await bcrypt.compare(password, isExist.password);

  if (!isPassMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password not matched');
  }

  const accessToken = JwtHelper.createToken(
    { id: isExist._id, email: isExist.email },
    config.jwt.secret as Secret,
    '30d'
  );

  return {
    accessToken,
  };
};

const refreshToken = async (token: { token: string }) => {
  let verifyToken;

  try {
    verifyToken = JwtHelper.verifyToken(
      token.token,
      config.jwt.secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token not verified');
  }

  const { email } = verifyToken;

  const isExist = await Store.findOne({
    email: email,
  });

  if (!isExist) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Store not found');
  }

  const accessToken = JwtHelper.createToken(
    { id: isExist._id, email: isExist.email },
    config.jwt.secret as Secret,
    '5m'
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
