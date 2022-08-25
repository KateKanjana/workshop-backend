import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class SearchDTO {
  @IsNumber()
  @Type(() => Number)
  page = 1;

  @IsNumber()
  @Type(() => Number)
  limit = 20;

  @IsBoolean()
  @Transform((transformFn) => {
    if (transformFn.value === 'true') return true;
    else return false;
  })
  count = false;

  @IsString()
  @Type(() => String)
  query = '';
}
