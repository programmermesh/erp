import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCustomersProblemsSolutionsService } from './companies-customers-problems-solutions.service';

describe('CompaniesCustomersProblemsSolutionsService', () => {
  let service: CompaniesCustomersProblemsSolutionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesCustomersProblemsSolutionsService],
    }).compile();

    service = module.get<CompaniesCustomersProblemsSolutionsService>(CompaniesCustomersProblemsSolutionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
