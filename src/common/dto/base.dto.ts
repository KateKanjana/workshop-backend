import { Model } from 'sequelize';

export class BaseDTO {
  constructor(data?: any) {
    if (!data) {
      return;
    }
    if (data instanceof Model) {
      Object.assign(this, data.toJSON());
      return;
    }

    Object.assign(this, data);
  }
}
