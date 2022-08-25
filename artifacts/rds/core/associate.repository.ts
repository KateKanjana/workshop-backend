import { OnApplicationBootstrap } from '@nestjs/common';
import { BaseRepository } from './base.repository';

export abstract class AssociateRepository
  extends BaseRepository
  implements OnApplicationBootstrap
{
  private associateFetch: Map<string, any>;

  /**
   * TODO
   * Need associateModels provide factory method for better usage
   */
  protected abstract setupAssociation(associateFetch: Map<string, any>): void;

  include(key: string): AssociateRepository {
    this.includeOptions['include'] = this.associateFetch.get(key);
    return this;
  }

  onModuleInit() {
    super.onModuleInit();
    this.associateFetch = new Map<string, any>();
  }

  onApplicationBootstrap() {
    this.setupAssociation(this.associateFetch);
  }
}
