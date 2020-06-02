import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCustomersProblemsService } from './companies-customers-problems.service';

describe('CompaniesCustomersProblemsService', () => {
  let service: CompaniesCustomersProblemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesCustomersProblemsService],
    }).compile();

    service = module.get<CompaniesCustomersProblemsService>(CompaniesCustomersProblemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
