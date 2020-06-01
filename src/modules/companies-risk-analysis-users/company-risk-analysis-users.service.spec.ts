import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRiskAnalysisUsersService } from './company-risk-analysis-users.service';

describe('CompanyRiskAnalysisUsersService', () => {
  let service: CompanyRiskAnalysisUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyRiskAnalysisUsersService],
    }).compile();

    service = module.get<CompanyRiskAnalysisUsersService>(CompanyRiskAnalysisUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
