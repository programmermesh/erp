import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRiskAnalysisUsersController } from './company-risk-analysis-users.controller';

describe('CompanyRiskAnalysisUsers Controller', () => {
  let controller: CompanyRiskAnalysisUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyRiskAnalysisUsersController],
    }).compile();

    controller = module.get<CompanyRiskAnalysisUsersController>(CompanyRiskAnalysisUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
