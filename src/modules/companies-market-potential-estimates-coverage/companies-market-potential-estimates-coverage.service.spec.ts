import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesMarketPotentialEstimatesCoverageService } from './companies-market-potential-estimates-coverage.service';

describe('CompaniesMarketPotentialEstimatesCoverageService', () => {
  let service: CompaniesMarketPotentialEstimatesCoverageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesMarketPotentialEstimatesCoverageService],
    }).compile();

    service = module.get<CompaniesMarketPotentialEstimatesCoverageService>(CompaniesMarketPotentialEstimatesCoverageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
