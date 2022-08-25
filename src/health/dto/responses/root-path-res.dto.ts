import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class RootPathResDto {
  constructor(appName: string) {
    this.appName = appName;
  }

  @ApiProperty({ name: process.env.APP_NAME })
  @Expose({ name: process.env.APP_NAME })
  public readonly appName: string;
}
