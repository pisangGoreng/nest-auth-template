import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all() {
    const [users, usersErr] = await this.roleService.findAll();
    if (usersErr) throw new BadRequestException(usersErr);

    return users;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: number): Promise<any> {
    const [user, userErr] = await this.roleService.findOne({ id }, [
      'permissions',
    ]);
    if (userErr) throw new BadRequestException(userErr);

    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body('name') name: string, @Body('permissions') ids: number[]) {
    // input from client ids =>[1, 2]
    // output ids => [{id: 1}, {id: 2}]

    const [createdRole, createdRoleErr] = await this.roleService.create({
      name,
      permissions: ids.map((id) => ({ id })),
    });
    if (createdRoleErr) throw new BadRequestException(createdRoleErr);

    return createdRole;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('permissions') ids: number[],
  ) {
    const [, updatedRoleErr] = await this.roleService.update(id, {
      name,
    });
    if (updatedRoleErr) throw new BadRequestException(updatedRoleErr);

    const [selectedRole, selectedRoleErr] = await this.roleService.findOne(
      { id },
      ['permissions'],
    );
    if (selectedRoleErr) throw new BadRequestException(selectedRoleErr);

    const [newRole, newRoleErr] = await this.roleService.create({
      ...selectedRole,
      permissions: ids.map((id) => ({ id })),
    });
    if (newRoleErr) throw new BadRequestException(newRoleErr);

    return newRole;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number): Promise<any> {
    const [deletedUser, deletedUserErr] = await this.roleService.delete(id);
    if (deletedUserErr) throw new BadRequestException(deletedUserErr);

    return deletedUser;
  }
}
