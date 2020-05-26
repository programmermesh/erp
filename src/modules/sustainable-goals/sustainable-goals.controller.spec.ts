import { Test, TestingModule } from '@nestjs/testing';
import { SustainableGoalsController } from './sustainable-goals.controller';

describe('SustainableGoals Controller', () => {
  let controller: SustainableGoalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SustainableGoalsController],
    }).compile();

    controller = module.get<SustainableGoalsController>(SustainableGoalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
