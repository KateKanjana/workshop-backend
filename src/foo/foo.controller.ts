import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FooDTO } from './dto/foo.dto';
import { FooService } from './foo.service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RequestDTO } from 'src/common/dto/request.dto';
import { FooSearchDTO } from './dto/foo-search.dto';
import { ErrorInterceptor } from 'src/common/interceptor/error.interceptor';

@Controller('/v1/foo')
export class FooController {
  constructor(private readonly fooService: FooService) {}

  @Get('/search')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(new ErrorInterceptor())
  searchFoo(
    @Query() fooSearchDTO: FooSearchDTO,
  ): Promise<ResponseDTO<FooDTO[]>> {
    return this.fooService.search(fooSearchDTO).then((result) => {
      return result;
    });
  }

  @Get('/get/:id')
  @UseInterceptors(new ErrorInterceptor())
  getFoo(@Param('id') id: string): Promise<ResponseDTO<FooDTO>> {
    return this.fooService.read(id).then((result) => {
      const response = new ResponseDTO<FooDTO>();
      response.data = result;

      return response;
    });
  }

  @Post('/create')
  @UseInterceptors(new ErrorInterceptor())
  createFoo(@Body() FooDTO: RequestDTO<FooDTO>): Promise<ResponseDTO<FooDTO>> {
    return this.fooService.create(FooDTO.data).then((result) => {
      const response = new ResponseDTO<FooDTO>();
      response.data = result;

      return response;
    });
  }

  @Put('/update')
  @UseInterceptors(new ErrorInterceptor())
  updateFoo(
    @Body() FooUpdateDTO: RequestDTO<FooDTO>,
  ): Promise<ResponseDTO<FooDTO>> {
    return this.fooService.update(FooUpdateDTO.data).then((result) => {
      const response = new ResponseDTO<FooDTO>();
      response.data = result;

      return response;
    });
  }

  @Delete('/delete/:id')
  @UseInterceptors(new ErrorInterceptor())
  deleteFoo(@Param('id') id: string): Promise<ResponseDTO<any>> {
    return this.fooService.delete(id).then((result) => {
      const response = new ResponseDTO<any>();
      response.data = result;

      return response;
    });
  }
}
