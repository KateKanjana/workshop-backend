import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RDSClient } from './core/rds.client';

@Injectable()
export class RDSService implements OnModuleInit {
  private rdsClient: RDSClient;

  constructor(private configService: ConfigService) {
    this.rdsClient = new RDSClient('postgres', this.getConfiguration());
  }

  getConfiguration(): string {
    return this.configService.get('PG_DB_CONFIG');
  }

  async onModuleInit(): Promise<void> {
    await this.rdsClient.authenticate();
  }

  getRDSClient(): RDSClient {
    return this.rdsClient;
  }
}
