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
import { ApiOperation, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Gets all users' })
  async getAll(@Query('page') page = 1): Promise<any> {
    const [users, usersErr] = await this.userService.findAll();
    if (usersErr) throw new BadRequestException(usersErr);

    return users;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: 'number', description: 'get one user by id' })
  async get(@Param('id') id: number): Promise<any> {
    const [user, userErr] = await this.userService.findOne({ id });
    if (userErr) throw new BadRequestException(userErr);

    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: UserCreateDto,
    description: 'create user object format',
  })
  async create(@Body() body: UserCreateDto): Promise<any> {
    const { password } = body;
    const [createdUser, createdUserErr] = await this.userService.create({
      ...body,
      password: await bcrypt.hash(password, 12),
      role: { id: 1 },
    });
    if (createdUserErr) throw new BadRequestException(createdUserErr);

    return createdUser;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'update user by id',
  })
  @ApiBody({
    type: UserUpdateDto,
    description: 'update user object format',
  })
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
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'delete user by user id',
  })
  async delete(@Param('id') id: number): Promise<any> {
    const [deletedUser, deletedUserErr] = await this.userService.delete(id);
    if (deletedUserErr) throw new BadRequestException(deletedUserErr);

    return deletedUser;
  }
}
