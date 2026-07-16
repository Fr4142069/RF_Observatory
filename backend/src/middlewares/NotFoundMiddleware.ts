import { Request, Response, NextFunction } from 'express';
import { ErrorFactory } from '../errors/ErrorFactory';

export const NotFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errorResponse = ErrorFactory.create(
    req,
    404,
    'ENDPOINT_NOT_FOUND',
    'Endpoint Not Found',
    `The requested resource ${req.method} ${req.originalUrl} does not exist.`
  );
  
  res.status(404).json(errorResponse);
};
