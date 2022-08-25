import { Test, TestingModule } from '@nestjs/testing';
import { FooBarController } from '../foo-bar.controller';
import { FooBarService } from '../foo-bar.service';

describe('FooBarController', () => {
  let fooBarController: FooBarController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FooBarController],
      providers: [FooBarService],
    }).compile();

    fooBarController = app.get<FooBarController>(FooBarController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(fooBarController.getHello()).toBe('Hello World!');
    });
  });
});
