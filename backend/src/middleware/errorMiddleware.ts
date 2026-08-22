import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Unhandled server exception captured:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  const response: Record<string, any> = {
    success: false,
    message,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      details: err.details || {}
    }
  };

  // Expose stack trace only during local development testing
  if (env.NODE_ENV === 'development') {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
export default errorMiddleware;
