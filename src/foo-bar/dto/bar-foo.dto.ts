import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { BarDTO } from 'src/bar/dto/bar.dto';
import { FooDTO } from 'src/foo/dto/foo.dto';

export class BarFooDTO extends BarDTO {
  @IsArray()
  @ApiProperty({
    description: 'foo in bar',
    type: [],
    example: [],
  })
  foos: FooDTO[];
}
