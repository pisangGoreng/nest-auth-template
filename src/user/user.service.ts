import { Injectable } from '@nestjs/common';

import { User } from './models/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<any> {
    return this.userRepository.all();
  }

  async findOne(condition, relations: any[] = []): Promise<any[]> {
    return await this.userRepository.findOne(condition, relations);
  }

  async paginate(page = 1, relations: any[] = []): Promise<any[]> {
    return await this.userRepository.paginate(page, relations);
  }

  async create(data): Promise<any> {
    return this.userRepository.create(data);
  }

  async update(id: number, data): Promise<any> {
    return this.userRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }
}
