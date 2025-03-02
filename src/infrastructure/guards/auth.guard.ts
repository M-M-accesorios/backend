import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    };

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as { id: string; role: string };
      request.id = decoded.id;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    };
  };
};
