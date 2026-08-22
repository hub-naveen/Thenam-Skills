import { Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { AuthenticatedRequest } from './authMiddleware';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      console.error('Validation Error Details:', JSON.stringify(error.errors || error, null, 2));
      return res.status(400).json({
        success: false,
        message: 'Request parameters validation failed.',
        error: {
          code: 'VALIDATION_ERROR',
          details: error.format ? error.format() : error.errors
        }
      });
    }
  };
};
export default validateRequest;
