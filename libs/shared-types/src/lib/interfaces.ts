import { CodeValue } from "./types";

export interface SuccessResponse<TData> {
  /**
   * Return true if the response success else return false
   */
  success: true;
  /**
   * The detail about response if needed
   */
  detail?: string;
  /**
   * The message for response
   */
  message?: string;
  /**
   * Return the data
   */
  data: TData;
  /**
   * The time when the errors occurred
   */
  timestamp: string;
}

export interface ErrorResponse {
  /**
   * Return true if the response success else return false
   */
  success: false;
  /**
   * The Code Type
   */
  code: CodeValue;
  /**
   * The Error message
   */
  message: string;
  /**
   * The detail about response if needed
   */
  detail?: string;
  /** If throws multiple errors for different fields */
  paths?: {
    [x: string]: string[] | undefined;
    [x: number]: string[] | undefined;
    [x: symbol]: string[] | undefined;
  };
  /**
   * The time when the errors occurred
   */
  timeStamp: string;
}
