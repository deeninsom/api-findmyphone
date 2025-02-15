import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { PrismaService } from 'src/prisma.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private prisma: PrismaService
    ) { }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new UnauthorizedException('Missing token !');
      }

  
      const decodedToken = this.jwtService.verify(token);
      
      const userId = decodedToken['userId'];
      const user = await this.prisma.users.findUnique({ where: { id: userId }});
  
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
  
      request.user = user;
  
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const authHeader = request.headers['authorization'];
      if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
      }
      return undefined;
    }
  }
  