import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RDSService } from './rds.service';

@Module({
  imports: [ConfigModule],
  providers: [RDSService],
  exports: [RDSService],
})
export class RDSModule {}
