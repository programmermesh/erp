import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesSustainableGoalsController } from './companies-sustainable-goals.controller';

describe('CompaniesSustainableGoals Controller', () => {
  let controller: CompaniesSustainableGoalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesSustainableGoalsController],
    }).compile();

    controller = module.get<CompaniesSustainableGoalsController>(CompaniesSustainableGoalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
