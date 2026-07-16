import { Request } from 'express';

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ResponseMeta {
  pagination?: PaginationMeta;
  executionTime?: number;
  warnings?: string[];
  apiVersion?: string;
}

export interface SuccessResponse<T> {
  timestamp: string;
  requestId: string;
  success: true;
  data: T | null;
  meta: ResponseMeta;
}

export class ResponseFactory {
  static success<T>(
    req: Request,
    data: T | null,
    meta: ResponseMeta = {}
  ): SuccessResponse<T> {
    return {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string || 'UNKNOWN',
      success: true,
      data,
      meta,
    };
  }
}
