import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesMilestonesService } from './companies-milestones.service';

describe('CompaniesMilestonesService', () => {
  let service: CompaniesMilestonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesMilestonesService],
    }).compile();

    service = module.get<CompaniesMilestonesService>(CompaniesMilestonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
