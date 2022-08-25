import { Module } from '@nestjs/common';
import { RDSModule } from 'artifacts/rds/rds.module';
import { FooBarController } from './foo-bar.controller';
import { FooBarService } from './foo-bar.service';
import { FooBarRepository } from './repositories/foo-bar.repository';
import { FooBarBLL } from './bll/foo-bar.bll';
import { FooRepository } from '../foo/repositories/foo.repository';
import { BarRepository } from '../bar/repositories/bar.repository';
import { FooBarRelationRepository } from './repositories/foo-bar-relation.repository';

@Module({
  imports: [RDSModule],
  controllers: [FooBarController],
  providers: [
    FooBarBLL,
    FooBarService,
    FooBarRepository,
    FooBarRelationRepository,
    FooRepository,
    BarRepository,
  ],
})
export class FooBarModule {}
