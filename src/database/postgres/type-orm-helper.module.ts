import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [],
  exports: [TypeOrmModule],
})
export class TypeOrmHelperModule {}
