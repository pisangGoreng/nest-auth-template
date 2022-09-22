import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from 'src/role/models/role.entity';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' }) // to rename column in database, default is camelCase
  role: Role;
}

// ! Eclude() => untuk me remove field sebelum di kirim menjadi response
// ! ini memerlukan interceptor & wajib dipakai
// ! @UseInterceptors(ClassSerializerInterceptor)
