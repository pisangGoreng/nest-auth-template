import { Injectable } from '@nestjs/common';

import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async findAll(): Promise<any> {
    return this.roleRepository.all(['permissions']);
  }

  async findOne(condition, relations: any[] = []): Promise<any[]> {
    return await this.roleRepository.findOne(condition, relations);
  }

  async paginate(page = 1, relations: any[] = []): Promise<any[]> {
    return await this.roleRepository.paginate(page, relations);
  }

  async create(data): Promise<any> {
    return this.roleRepository.create(data);
  }

  async update(id: number, data): Promise<any> {
    return this.roleRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.roleRepository.delete(id);
  }
}
