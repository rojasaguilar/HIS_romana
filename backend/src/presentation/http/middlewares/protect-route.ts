import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from './asyncHandler';
import { ITokenService } from '../../../core/domain/interfaces/token.service.interface';

export const AuthMiddleware = (jwtService: ITokenService) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1];

      if (!token) {
        res.status(401).json({ message: 'Token no proporcionado' });
        return; // Importante el return para que no siga ejecutando
      }

      // Si esto falla (ej. expiró), asyncHandler manda el error al global error handler
      const decoded = await jwtService.decodeAccessToken(token);

      // Inyectamos el usuario en la request
      req.user = decoded;

      console.log(req.user);

      next();
    },
  );
};
