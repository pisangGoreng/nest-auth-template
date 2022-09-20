import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstact.repository';

import { Connection, Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserRepository extends AbstractRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    connection: Connection,
  ) {
    super(userRepository, connection);
  }
}
