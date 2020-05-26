import { Test, TestingModule } from '@nestjs/testing';
import { RiskAnalysisController } from './risk-analysis.controller';

describe('RiskAnalysis Controller', () => {
  let controller: RiskAnalysisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskAnalysisController],
    }).compile();

    controller = module.get<RiskAnalysisController>(RiskAnalysisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
