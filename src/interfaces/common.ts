import { TGenericErrorMessage } from './error';

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: TGenericErrorMessage[];
};
