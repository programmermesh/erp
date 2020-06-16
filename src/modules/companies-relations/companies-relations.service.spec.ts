import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesRelationsService } from './companies-relations.service';

describe('CompaniesRelationsService', () => {
  let service: CompaniesRelationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesRelationsService],
    }).compile();

    service = module.get<CompaniesRelationsService>(CompaniesRelationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
