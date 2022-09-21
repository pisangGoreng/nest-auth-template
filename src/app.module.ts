import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST, // ! service name in docker-compose in .env
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities:
        process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'dev-local', // use on DEV only
      entities: [],
      synchronize: true,
    }),
    CommonModule,
    UserModule,
    RoleModule,
    PermissionModule,
    AuthModule,
  ],
})
export class AppModule {}
