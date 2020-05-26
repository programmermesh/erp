import { Test, TestingModule } from '@nestjs/testing';
import { RiskAssessmentsController } from './risk-assessments.controller';

describe('RiskAssessments Controller', () => {
  let controller: RiskAssessmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskAssessmentsController],
    }).compile();

    controller = module.get<RiskAssessmentsController>(RiskAssessmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
