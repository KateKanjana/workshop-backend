import { Injectable } from '@nestjs/common';
import { FooBarService } from '../foo-bar.service';

@Injectable()
export class FooBarBLL {
  constructor(private readonly fooBarService: FooBarService) {}
}
