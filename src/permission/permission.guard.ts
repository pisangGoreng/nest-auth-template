import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/role/models/role.entity';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const access = this.reflector.get('access', context.getHandler());
    if (!access) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const [verifiedToken, verifiedTokenErr] =
      await this.authService.verifyToken(request);
    if (verifiedTokenErr) throw new BadRequestException(verifiedTokenErr);
    const userId = verifiedToken.id;

    // const user = await this.userService.findOne({ id: userId }, ['role']);

    const [user, userErr] = await this.userService.findOne({ id: userId }, [
      'role',
    ]);
    if (userErr) throw new BadRequestException(userErr);

    const [role, roleErr] = await this.roleService.findOne(
      { id: user.role.id },
      ['permissions'],
    );
    if (roleErr) throw new BadRequestException(roleErr);

    console.log('cek role ', role);

    // return true if user have role
    // contoh:
    // id name
    // 1  view_users
    // 2  edit_users
    // 3  view_roles
    // 4  edit_roles
    // 5  view_products
    // 6  edit_products
    // 7  view_orders
    // 8  edit_orders

    // guard ini dipakai di semua contoller

    if (request.method === 'GET') {
      return role.permissions.some(
        (p) => p.name === `view_${access}` || p.name === `edit_${access}`,
      );
    }

    return role.permissions.some((p) => p.name === `edit_${access}`);
  }
}
