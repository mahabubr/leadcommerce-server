import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { JwtHelper } from '../../helpers/jwtHelpers';
import Admin from '../admin/admin.model';
import Delivery from '../delivery/delivery.model';
import Store from '../store/store.model';
import { IAuth } from './auth.interface';
import Employe from '../employe/employe.model';

const loginUser = async (payload: IAuth) => {
  const { email, password } = payload;

  const admin = await Admin.findOne({ email: email });
  const employee = await Employe.findOne({ email: email });
  const store = await Store.findOne({ email: email });
  const delivery = await Delivery.findOne({ email: email });

  if (!admin && !store && !employee && !delivery) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User Not Found');
  }

  if (admin) {
    const isPassMatched = await bcrypt.compare(password, admin.password);

    if (!isPassMatched) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password not matched');
    }

    const accessToken = JwtHelper.createToken(
      { id: admin._id, email: admin.email, role: 'admin' },
      config.jwt.secret as Secret,
      '30d'
    );

    return {
      accessToken,
    };
  }

  if (employee) {
    const isPassMatched = await bcrypt.compare(password, employee.password);

    if (!isPassMatched) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password not matched');
    }

    const accessToken = JwtHelper.createToken(
      { id: employee._id, email: employee.email, role: 'employee' },
      config.jwt.secret as Secret,
      '30d'
    );

    return {
      accessToken,
    };
  }
  if (store) {
    const isPassMatched = await bcrypt.compare(password, store.password);

    if (!isPassMatched) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password not matched');
    }

    const accessToken = JwtHelper.createToken(
      { id: store._id, email: store.email, role: 'store' },
      config.jwt.secret as Secret,
      '30d'
    );

    return {
      accessToken,
    };
  }
  if (delivery) {
    const isPassMatched = await bcrypt.compare(password, delivery.password);

    if (!isPassMatched) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password not matched');
    }

    const accessToken = JwtHelper.createToken(
      { id: delivery._id, email: delivery.email, role: 'delivery' },
      config.jwt.secret as Secret,
      '30d'
    );

    return {
      accessToken,
    };
  }
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
