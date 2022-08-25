import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString, ValidateIf } from 'class-validator';

export class RequestDTO<T> {
  @IsObject()
  @ValidateIf((o) => o.data || !o.query)
  @ApiProperty()
  data: T = null;

  @IsString()
  @ValidateIf((o) => !o.data || o.query)
  @ApiProperty()
  query: string;
}
