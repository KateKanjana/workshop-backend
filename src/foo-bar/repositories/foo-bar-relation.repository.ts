import { Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelCtor } from 'sequelize';
import { RDSService } from 'artifacts/rds/rds.service';
import { BaseRepository } from 'artifacts/rds/core/base.repository';

@Injectable()
export class FooBarRelationRepository extends BaseRepository {
  private fooBarRelationModel: ModelCtor<Model>;

  constructor(private readonly rdsService: RDSService) {
    super();
  }

  protected init() {
    this.fooBarRelationModel = this.rdsService
      .getRDSClient()
      .getModelBuilder()
      .define(
        'fooBarRelation',
        {
          fooId: {
            type: DataTypes.INTEGER,
          },
          barId: {
            type: DataTypes.INTEGER,
          },
          createdAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
          },
          updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
          },
        },
        'foo_bar_relations',
        true,
      );
    return this.fooBarRelationModel;
  }
}
