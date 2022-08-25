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
import { BarDTO } from './dto/bar.dto';
import { BarService } from './bar.service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RequestDTO } from 'src/common/dto/request.dto';
import { BarSearchDTO } from './dto/bar-search.dto';
import { ErrorInterceptor } from 'src/common/interceptor/error.interceptor';

@Controller('/v1/bar')
export class BarController {
  constructor(private readonly barService: BarService) {}

  @Get('/search')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(new ErrorInterceptor())
  searchBar(
    @Query() barSearchDTO: BarSearchDTO,
  ): Promise<ResponseDTO<BarDTO[]>> {
    return this.barService.search(barSearchDTO).then((result) => {
      return result;
    });
  }

  @Get('/get/:id')
  @UseInterceptors(new ErrorInterceptor())
  getBar(@Param('id') id: string): Promise<ResponseDTO<BarDTO>> {
    return this.barService.read(id).then((result) => {
      const response = new ResponseDTO<BarDTO>();
      response.data = result;

      return response;
    });
  }

  @Post('/create')
  @UseInterceptors(new ErrorInterceptor())
  createBar(@Body() barDTO: RequestDTO<BarDTO>): Promise<ResponseDTO<BarDTO>> {
    return this.barService.create(barDTO.data).then((result) => {
      const response = new ResponseDTO<BarDTO>();
      response.data = result;

      return response;
    });
  }

  @Put('/update')
  @UseInterceptors(new ErrorInterceptor())
  updateBar(
    @Body() barUpdateDTO: RequestDTO<BarDTO>,
  ): Promise<ResponseDTO<BarDTO>> {
    return this.barService.update(barUpdateDTO.data).then((result) => {
      const response = new ResponseDTO<BarDTO>();
      response.data = result;

      return response;
    });
  }

  @Delete('/delete/:id')
  @UseInterceptors(new ErrorInterceptor())
  deleteBar(@Param('id') id: string): Promise<ResponseDTO<any>> {
    return this.barService.delete(id).then((result) => {
      const response = new ResponseDTO<any>();
      response.data = result;

      return response;
    });
  }
}
