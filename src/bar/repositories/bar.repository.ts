import { Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelCtor } from 'sequelize';
import { RDSService } from 'artifacts/rds/rds.service';
import { BaseRepository } from 'artifacts/rds/core/base.repository';

@Injectable()
export class BarRepository extends BaseRepository {
  private barModel: ModelCtor<Model>;

  constructor(private readonly rdsService: RDSService) {
    super();
  }

  protected init() {
    this.barModel = this.rdsService
      .getRDSClient()
      .getModelBuilder()
      .define(
        'bar',
        {
          productId: {
            type: DataTypes.NUMBER,
          },
          // value: {
          //   type: DataTypes.NUMBER,
          // },
          // unit: {
          //   type: DataTypes.STRING,
          // },
          // condition: {
          //   type: DataTypes.JSON,
          // },
          // createdAt: {
          //   type: DataTypes.DATE,
          //   defaultValue: Date.now,
          // },
          // updatedAt: {
          //   type: DataTypes.DATE,
          //   defaultValue: Date.now,
          // },
        },
        'bars',
        true,
      );
    return this.barModel;
  }
}
