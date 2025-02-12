import { AxiosResponse } from 'axios';

export type ServiceFunction<Response, Params = undefined> = (
  params?: Params,
) => Promise<AxiosResponse<Response>>