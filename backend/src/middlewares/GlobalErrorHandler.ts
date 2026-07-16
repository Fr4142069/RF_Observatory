import { Request, Response, NextFunction } from 'express';
import { ErrorFactory } from '../errors/ErrorFactory';

export const GlobalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Aquí interceptaremos en el futuro los ApplicationError y DomainError específicos.
  // Por ahora, asumimos cualquier error no mapeado como un error interno inesperado.
  // IMPORTANTE: Nunca devolver el stack trace al cliente en producción.
  
  console.error('[GlobalErrorHandler] Uncaught error:', err); // Solo para logs internos

  const isValidation = err.code === 'VALIDATION_ERROR';
  const status = err.statusCode || (isValidation ? 422 : 500);
  const code = err.code || 'INTERNAL_ERROR';
  const title = err.title || (isValidation ? 'Validation Error' : 'Unexpected Internal Error');
  const detail = status >= 500 
    ? 'An unexpected error occurred on the server.' 
    : err.message || 'An error occurred while processing the request.';

  const errorResponse = ErrorFactory.create(req, status, code, title, detail);
  
  res.status(status).json(errorResponse);
};
