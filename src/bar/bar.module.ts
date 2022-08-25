import { Module } from '@nestjs/common';
import { RDSModule } from 'artifacts/rds/rds.module';
import { BarController } from './bar.controller';
import { BarService } from './bar.service';
import { BarRepository } from './repositories/bar.repository';

@Module({
  imports: [RDSModule],
  controllers: [BarController],
  providers: [BarService, BarRepository],
})
export class BarModule {}
