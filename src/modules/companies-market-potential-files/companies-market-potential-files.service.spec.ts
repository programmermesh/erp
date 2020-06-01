import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesMarketPotentialFilesService } from './companies-market-potential-files.service';

describe('CompaniesMarketPotentialFilesService', () => {
  let service: CompaniesMarketPotentialFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesMarketPotentialFilesService],
    }).compile();

    service = module.get<CompaniesMarketPotentialFilesService>(CompaniesMarketPotentialFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
