import { ErrorResponse } from '~/types';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string | null;
  created_at: Date;
  updated_at: Date;
}

export type AccessToken = {
  accessToken: string;
};

export interface IErrorResponse {
  status: number;
  data: ErrorResponse;
}

export type error = {
  error: IErrorResponse
  isUnhandledError: false,
  meta: undefined
}