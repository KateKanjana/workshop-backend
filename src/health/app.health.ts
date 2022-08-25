import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';

@Injectable()
export class AppHealthIndicator extends HealthIndicator {
  constructor() {
    super();
  }

  public async isHealthy(key: string): Promise<HealthIndicatorResult> {
    let isHealthy = false;
    const error = '';

    //TODO check healthy
    isHealthy = true;

    const result: HealthIndicatorResult = this.getStatus(key, isHealthy, {
      error,
    });

    if (isHealthy) {
      return result;
    }

    throw new HealthCheckError('Health check failed', result);
  }
}
