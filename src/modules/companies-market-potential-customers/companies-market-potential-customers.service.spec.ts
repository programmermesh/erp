import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesMarketPotentialCustomersService } from './companies-market-potential-customers.service';

describe('CompaniesMarketPotentialCustomersService', () => {
  let service: CompaniesMarketPotentialCustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesMarketPotentialCustomersService],
    }).compile();

    service = module.get<CompaniesMarketPotentialCustomersService>(CompaniesMarketPotentialCustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
