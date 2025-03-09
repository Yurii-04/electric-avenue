import { ErrorResponse as ApiErrorResponse } from '~/types';

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

export interface ErrorResponse {
  status: number;
  data: ApiErrorResponse;
}
