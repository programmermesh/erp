import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesContractFilesService } from './companies-contract-files.service';

describe('CompaniesContractFilesService', () => {
  let service: CompaniesContractFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesContractFilesService],
    }).compile();

    service = module.get<CompaniesContractFilesService>(CompaniesContractFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
