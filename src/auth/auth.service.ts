import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async verifyToken(request: Request): Promise<any[]> {
    const results = [null, null];

    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      results[0] = data;
    } catch (error) {
      results[1] = error;
    }

    return results;
  }
}
