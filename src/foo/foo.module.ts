import { Module } from '@nestjs/common';
import { RDSModule } from 'artifacts/rds/rds.module';
import { FooController } from './foo.controller';
import { FooService } from './foo.service';
import { FooRepository } from './repositories/foo.repository';

@Module({
  imports: [RDSModule],
  controllers: [FooController],
  providers: [FooService, FooRepository],
})
export class FooModule {}
