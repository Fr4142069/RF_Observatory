import { Request } from 'express';

export interface ErrorResponse {
  timestamp: string;
  requestId: string;
  status: number;
  code: string;
  title: string;
  detail: string;
  path: string;
}

export class ErrorFactory {
  static create(
    req: Request,
    status: number,
    code: string,
    title: string,
    detail: string
  ): ErrorResponse {
    return {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string || 'UNKNOWN',
      status,
      code,
      title,
      detail,
      path: req.originalUrl,
    };
  }
}
