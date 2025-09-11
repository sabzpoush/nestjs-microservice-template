import { Module } from '@nestjs/common';
import { staticModules } from './config/static.modules';
import { dynamicModules } from './config/dynamic.modules';

@Module({
  imports: [...staticModules, ...dynamicModules],
})
export class AppModule {}
