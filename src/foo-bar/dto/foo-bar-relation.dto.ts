import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class FooBarRelationDTO extends BaseDTO {
  @IsNumber()
  @ApiProperty({
    description: 'foo id',
    type: Number,
    example: 1,
  })
  fooId: number;

  @IsNumber()
  @ApiProperty({
    description: 'bar id',
    type: Number,
    example: 1,
  })
  barId: number;
}
