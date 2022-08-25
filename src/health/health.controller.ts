import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { HealthCheckResult } from '@nestjs/terminus/dist/health-check';
import { Public } from 'artifacts/auth/metadata/public.metadata';
import { AppHealthIndicator } from './app.health';
import { RootPathResDto } from './dto/responses/root-path-res.dto';

@ApiTags('Health')
@Controller()
export class HealthController {
  constructor(
    private healthService: HealthCheckService,
    private appHealthIndicator: AppHealthIndicator,
  ) {}

  @Public()
  @ApiOperation({ summary: 'Get app name' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Call root path and return app name',
    type: RootPathResDto,
  })
  @Get()
  public rootPath(): RootPathResDto {
    return new RootPathResDto(process.env.APP_NAME);
  }

  @Public()
  @ApiOperation({ summary: 'Get API status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Check API and database status',
  })
  @Get('/v1/health')
  @HealthCheck()
  public readiness(): Promise<HealthCheckResult> {
    return this.healthService.check([
      async (): Promise<HealthIndicatorResult> =>
        this.appHealthIndicator.isHealthy('app'),
    ]);
  }
}
