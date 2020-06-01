import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesMarketPotentialEstimatesCoverageController } from './companies-market-potential-estimates-coverage.controller';

describe('CompaniesMarketPotentialEstimatesCoverage Controller', () => {
  let controller: CompaniesMarketPotentialEstimatesCoverageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesMarketPotentialEstimatesCoverageController],
    }).compile();

    controller = module.get<CompaniesMarketPotentialEstimatesCoverageController>(CompaniesMarketPotentialEstimatesCoverageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
