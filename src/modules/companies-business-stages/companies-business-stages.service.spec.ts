import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesBusinessStagesService } from './companies-business-stages.service';

describe('CompaniesBusinessStagesService', () => {
  let service: CompaniesBusinessStagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesBusinessStagesService],
    }).compile();

    service = module.get<CompaniesBusinessStagesService>(CompaniesBusinessStagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
