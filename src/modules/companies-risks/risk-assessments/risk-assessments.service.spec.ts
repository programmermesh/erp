import { Test, TestingModule } from '@nestjs/testing';
import { RiskAssessmentsService } from './risk-assessments.service';

describe('RiskAssessmentsService', () => {
  let service: RiskAssessmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskAssessmentsService],
    }).compile();

    service = module.get<RiskAssessmentsService>(RiskAssessmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
