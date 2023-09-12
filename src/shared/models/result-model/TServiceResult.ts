import { ServiceResult } from "./ServiceResult";

export class TSResult<T> extends ServiceResult {
  result: T;
  constructor(
    retVal: T,
    message: string,
    error: any,
    hasError: boolean,
    refrenceId: string,
  ) {
    super(message, error, hasError, refrenceId)
    this.result = retVal;
  }
}