import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { RDSModelBuilder } from './rds.builder.model';

export class RDSClient {
  private sequelize: Sequelize;
  // private rdsModelBuilder: RDSModelBuilder;

  /**
   * Initiate config and start authenticate DB
   * @param configService a config service with value from .env
   */
  constructor(dialect: any, dbConfig: any) {
    const sslConfig = dbConfig.ssl
      ? {
          require: true,
          rejectUnauthorized: false,
        }
      : false;
    this.sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.dbuser,
      dbConfig.password,
      {
        host: dbConfig.host,
        dialect: dialect,
        dialectOptions: {
          ssl: sslConfig,
        },
        logging: dbConfig.logging,
      },
    );

    // this.authenticate();
  }

  /**
   * Authenticate DB for starting a connection
   */
  async authenticate() {
    try {
      await this.sequelize.authenticate();
      // this.rdsModelBuilder = new RDSModelBuilder(this.sequelize);
      Logger.log(
        'Sequelize Connection has been established successfully.',
        RDSClient.name,
      );
    } catch (err) {
      Logger.error(err, err.stack, RDSClient.name);
    }
  }

  getSequelize(): Sequelize {
    return this.sequelize;
  }

  getModelBuilder(): RDSModelBuilder {
    return new RDSModelBuilder(this.sequelize);
  }
}
