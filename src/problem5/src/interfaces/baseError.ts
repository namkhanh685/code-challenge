export interface BaseError extends Error {
  httpStatus?: number;
  statusCode: number;
  message: string;
}
