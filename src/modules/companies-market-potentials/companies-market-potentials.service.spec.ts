import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesMarketPotentialsService } from './companies-market-potentials.service';

describe('CompaniesMarketPotentialsService', () => {
  let service: CompaniesMarketPotentialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesMarketPotentialsService],
    }).compile();

    service = module.get<CompaniesMarketPotentialsService>(CompaniesMarketPotentialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
