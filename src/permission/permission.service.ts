import { Injectable } from '@nestjs/common';

import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) {}

  async findAll(): Promise<any> {
    return this.permissionRepository.all();
  }
}
