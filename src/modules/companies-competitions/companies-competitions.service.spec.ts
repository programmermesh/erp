import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCompetitionsService } from './companies-competitions.service';

describe('CompaniesCompetitionsService', () => {
  let service: CompaniesCompetitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesCompetitionsService],
    }).compile();

    service = module.get<CompaniesCompetitionsService>(CompaniesCompetitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
