import { Controller, HttpService, Injectable } from '@nestjs/common';

@Injectable()
@Controller()
export class HTTPController {
  constructor(private readonly httpService: HttpService) {}
}
