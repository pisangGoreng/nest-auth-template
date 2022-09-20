import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstact.repository';

import { Connection, Repository } from 'typeorm';
import { Role } from './models/role.entity';

@Injectable()
export class RoleRepository extends AbstractRepository {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    connection: Connection,
  ) {
    super(roleRepository, connection);
  }
}
