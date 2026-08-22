import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';

export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        message: 'Access Denied. User profile is not initialized or synchronized.',
        error: {
          code: 'FORBIDDEN'
        }
      });
    }

    // Validate that the user role is in the allowed list
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access Denied. You do not have permission to access this resource.',
        error: {
          code: 'FORBIDDEN',
          details: `Role required: one of [${allowedRoles.join(', ')}]. Current role: ${req.user.role}`
        }
      });
    }

    next();
  };
};
export default requireRole;
