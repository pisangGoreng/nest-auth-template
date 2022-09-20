import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'db', // ! service name in docker-compose
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_auth_template',
      autoLoadEntities: true, // use on DEV only
      entities: [],
      synchronize: true,
    }),
    // CommonModule,
    UserModule,
    RoleModule,
    PermissionModule,
  ],
})
export class AppModule {}
