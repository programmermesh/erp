import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesValuesService } from './companies-values.service';

describe('CompaniesValuesService', () => {
  let service: CompaniesValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesValuesService],
    }).compile();

    service = module.get<CompaniesValuesService>(CompaniesValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
