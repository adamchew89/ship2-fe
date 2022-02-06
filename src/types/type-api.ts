import { AxiosResponse } from "axios";

export interface ResponsePayload<T> {
  message: string;
  data?: T;
  statusCode?: number;
}

export interface ResponseAPI<T> extends AxiosResponse<ResponsePayload<T>> {}
