import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesContractsService } from './companies-contracts.service';

describe('CompaniesContractsService', () => {
  let service: CompaniesContractsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesContractsService],
    }).compile();

    service = module.get<CompaniesContractsService>(CompaniesContractsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
