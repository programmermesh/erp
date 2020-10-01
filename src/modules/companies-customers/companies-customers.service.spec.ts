import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCustomersService } from './companies-customers.service';

describe('CompaniesCustomersService', () => {
  let service: CompaniesCustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesCustomersService],
    }).compile();

    service = module.get<CompaniesCustomersService>(CompaniesCustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
