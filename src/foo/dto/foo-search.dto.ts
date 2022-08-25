import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SearchDTO } from 'src/common/dto/search.dto';

export class FooSearchDTO extends SearchDTO {
  @IsString()
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

  getStartDate() {
    return this.betweenDate.split(',')[0];
  }

  getEndDate() {
    return this.betweenDate.split(',')[1];
  }
}
