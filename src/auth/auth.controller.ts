import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Res,
  NotFoundException,
  Get,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './models/register.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  // ! data transfer dari REQUEST -> CONTROLLER
  // !  bisa pakai DTO
  // !  atau 1 per 1, @Body('email') email: string,
  // ! untuk validasi data nya, pakai class validator di dalam DTO nya

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDto) {
    const { password, password_confirm } = body;
    if (password !== password_confirm) {
      throw new BadRequestException('Password do not match');
    }

    const [createdUser, createdUserErr] = await this.userService.create({
      ...body,
      password: await bcrypt.hash(password, 12),
      role: { id: 1 },
    });
    if (createdUserErr) throw new BadRequestException(createdUserErr);

    return createdUser;
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const [user, userErr] = await this.userService.findOne({ email });
    if (!user) throw new NotFoundException('User not found');
    if (userErr) throw new BadRequestException(userErr);

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) throw new BadRequestException('Invalid credential');

    // ! secure way to sent token, is use cookies / HTTP onyl cookies
    // ! WHY use this? to prevent somebody change or modify the token
    // ! add passthrough: true to use cookies

    const jwt = await this.jwtService.signAsync({ id: user.id });
    response.cookie('jwt', jwt, { httpOnly: true });

    return user;
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  async userLoginDetails(@Req() request: Request) {
    // const id = await this.authService.userId(request);

    // return this.userService.findOne({ id });

    const [verifiedToken, verifiedTokenErr] =
      await this.authService.verifyToken(request);
    if (verifiedTokenErr) throw new BadRequestException(verifiedTokenErr);

    const [user, userErr] = await this.userService.findOne({
      id: verifiedToken.id,
    });
    if (userErr) throw new BadRequestException(userErr);

    return user;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Success',
    };
  }
}
