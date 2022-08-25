import { Sequelize, Model, ModelAttributes, ModelCtor } from 'sequelize';

export class RDSModelBuilder {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  define(
    modelName: string,
    modelAttr: ModelAttributes<any, any>,
    tableName: string,
    underscored = false,
  ): ModelCtor<Model<any, any>> {
    return this.sequelize.define(modelName, modelAttr, {
      // Other model options go here
      tableName: tableName,
      timestamps: false,
      underscored: underscored,
    });
  }
}
