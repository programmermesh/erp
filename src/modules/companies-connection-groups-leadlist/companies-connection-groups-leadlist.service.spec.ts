import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConnectionGroupsLeadlistService } from './companies-connection-groups-leadlist.service';

describe('CompaniesConnectionGroupsLeadlistService', () => {
  let service: CompaniesConnectionGroupsLeadlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesConnectionGroupsLeadlistService],
    }).compile();

    service = module.get<CompaniesConnectionGroupsLeadlistService>(CompaniesConnectionGroupsLeadlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
