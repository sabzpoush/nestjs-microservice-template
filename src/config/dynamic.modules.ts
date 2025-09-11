import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const dynamicModules = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService) => {
      return {
        type: 'postgres',
        host: configService.get<string>('POSTGRESQL_HOST'),
        port: configService.get<number>('POSTGRESQL_PORT'),
        username: configService.get<string>('POSTGRESQL_USERNAME'),
        password: configService.get<string>('POSTGRESQL_PASSWORD'),
        database: configService.get<string>('POSTGRESQL_DATABASE'),
        entities: ['dist/database/postgres/entity/*.entity{.ts,.js}'],
        synchronize: false,
      };
    },
    inject: [ConfigService],
  }),
] as DynamicModule[];
