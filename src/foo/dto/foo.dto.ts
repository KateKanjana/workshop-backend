import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class FooDTO extends BaseDTO {
  @IsNumber()
  @ApiProperty({
    description: 'id of foo',
    type: Number,
    example: 1,
  })
  id: number;

  @IsDate()
  @ApiProperty({
    description: 'Created date of foo',
    type: Date,
    example: '',
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    description: 'Updated date of foo',
    type: Date,
    example: '',
  })
  updatedAt: Date;
}
