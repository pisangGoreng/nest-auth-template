import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      // ! AUTHENTICATION PROCESS
      // ! check every each request that use "@UseGuards" have a correct token or not
      // !if true, the user is safe to continue the process
      const jwt = request.cookies['jwt'];
      return this.jwtService.verify(jwt);
    } catch (error) {
      return false;
    }
  }
}
