import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query('page') page = 1): Promise<any> {
    const [users, usersErr] = await this.userService.findAll();
    if (usersErr) throw new BadRequestException(usersErr);

    return users;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: number): Promise<any> {
    const [user, userErr] = await this.userService.findOne({ id });
    if (userErr) throw new BadRequestException(userErr);

    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: UserCreateDto): Promise<any> {
    const { password } = body;
    const [createdUser, createdUserErr] = await this.userService.create({
      ...body,
      password: await bcrypt.hash(password, 12),
    });
    if (createdUserErr) throw new BadRequestException(createdUserErr);

    return createdUser;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() body: UserUpdateDto,
  ): Promise<any> {
    const [updatedUser, updatedUserErr] = await this.userService.update(
      id,
      body,
    );
    if (updatedUserErr) throw new BadRequestException(updatedUserErr);

    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number): Promise<any> {
    const [deletedUser, deletedUserErr] = await this.userService.delete(id);
    if (deletedUserErr) throw new BadRequestException(deletedUserErr);

    return deletedUser;
  }
}
