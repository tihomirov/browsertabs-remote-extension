import {isObject, isString, typeguard} from './is';
import {Typeguard} from '../types';

type PayloadFail = Readonly<{ message: string }>;
export type ResponseSuccess<T> = Readonly<{ isSuccess: true; data: T }>;
export type ResponseFail<T> = Readonly<{ isSuccess: false; data: T }>;

export type Response<SuccessT, FailT = PayloadFail> = ResponseSuccess<SuccessT> | ResponseFail<FailT>;

export class ResponseFactory {
  static success<T>(data: T): ResponseSuccess<T> {
    return {isSuccess: true, data};
  }

  static fail<T = PayloadFail>(data: T): ResponseFail<T> {
    return {isSuccess: false, data};
  }

  static isSuccess<SuccessT, FailT>(response: Response<SuccessT, FailT>): response is ResponseSuccess<SuccessT> {
    return response.isSuccess;
  }

  static isFail<SuccessT, FailT>(response: Response<SuccessT, FailT>): response is ResponseFail<FailT> {
    return !response.isSuccess;
  }
}

export const responseTypeguard =
  <T, K = PayloadFail>(successDataTypeguard?: Typeguard<T>, errorDataTypeguard?: Typeguard<K>) =>
  (response: unknown): response is Response<T, K> => {
    const successTypeguard = typeguard<Response<T, K>>(
      ['isSuccess', (value) => value === true],
      ['data', successDataTypeguard ?? isObject],
    );
    const failTypeguard = typeguard<Response<T, K>>(
      ['isSuccess', (value) => value === false],
      ['data', errorDataTypeguard ?? typeguard(['message', isString])],
    );

    return successTypeguard(response) || failTypeguard(response);
  };
