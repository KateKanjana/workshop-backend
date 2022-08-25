import { Test, TestingModule } from '@nestjs/testing';
import { BarController } from '../bar.controller';
import { BarService } from '../bar.service';

describe('BarController', () => {
  let barController: BarController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BarController],
      providers: [BarService],
    }).compile();

    barController = app.get<BarController>(BarController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(barController.getHello()).toBe('Hello World!');
    });
  });
});
