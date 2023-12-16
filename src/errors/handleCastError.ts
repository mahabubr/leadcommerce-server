import mongoose from 'mongoose';
import { TGenericErrorMessage } from '../interfaces/error';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: TGenericErrorMessage[] = [
    {
      path: error.path,
      message: error.message || 'Invalid Id',
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
