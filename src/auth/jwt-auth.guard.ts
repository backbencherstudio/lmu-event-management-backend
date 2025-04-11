import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import * as jwt from 'jsonwebtoken';
  import * as dotenv from 'dotenv';
  
  dotenv.config();
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest<Request>();
      const authHeader = req.headers['authorization'];
  
      if (!authHeader) {
        throw new UnauthorizedException('Authorization token not found');
      }
  
      try {
        const token = authHeader.replace('Bearer ', ''); // in case token is prefixed with 'Bearer '
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  
        if (typeof decoded === 'object' && decoded['role'] !== 'ADMIN') {
          throw new ForbiddenException('Access denied: Admins only');
        }
  
        (req as any).user = decoded;
  
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  