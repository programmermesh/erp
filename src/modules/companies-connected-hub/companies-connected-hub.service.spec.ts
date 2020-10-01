import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConnectedHubService } from './companies-connected-hub.service';

describe('CompaniesConnectedHubService', () => {
  let service: CompaniesConnectedHubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesConnectedHubService],
    }).compile();

    service = module.get<CompaniesConnectedHubService>(CompaniesConnectedHubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
