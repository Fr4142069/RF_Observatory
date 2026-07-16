import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export const RequestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers['x-request-id'] || randomUUID();
  req.headers['x-request-id'] = requestId; // Lo inyectamos para que las factories lo lean
  res.setHeader('X-Request-Id', requestId); // Lo exponemos en la respuesta
  next();
};
