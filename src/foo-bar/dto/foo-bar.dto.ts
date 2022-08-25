import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { FooDTO } from 'src/foo/dto/foo.dto';
import { BarDTO } from 'src/bar/dto/bar.dto';

export class FooBarDTO extends FooDTO {
  @IsArray()
  @ApiProperty({
    description: 'bar in foo',
    type: [],
    example: [],
  })
  bars: BarDTO[];
}
