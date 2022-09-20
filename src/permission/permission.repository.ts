import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstact.repository';

import { Connection, Repository } from 'typeorm';
import { Permission } from './models/permission.entity';

@Injectable()
export class PermissionRepository extends AbstractRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    connection: Connection,
  ) {
    super(permissionRepository, connection);
  }
}
