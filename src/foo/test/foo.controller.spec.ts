import { Test, TestingModule } from '@nestjs/testing';
import { FooController } from '../foo.controller';
import { FooService } from '../foo.service';

describe('FooController', () => {
  let fooController: FooController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FooController],
      providers: [FooService],
    }).compile();

    fooController = app.get<FooController>(FooController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(fooController.getHello()).toBe('Hello World!');
    });
  });
});
