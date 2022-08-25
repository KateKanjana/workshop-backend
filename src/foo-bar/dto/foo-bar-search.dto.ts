import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SearchDTO } from 'src/common/dto/search.dto';

export class FooBarSearchDTO extends SearchDTO {
  @Type(() => String)
  status = '';

  @IsString()
  @Type(() => String)
  orderBy = '';

  @IsString()
  @Type(() => String)
  orderType = '';

  @IsString()
  @Type(() => String)
  between = '';

  @IsString()
  @Type(() => String)
  betweenDate = '';

  @Type(() => Number)
  id: number;

  getStartDate() {
    return this.betweenDate.split(',')[0];
  }

  getEndDate() {
    return this.betweenDate.split(',')[1];
  }
}
