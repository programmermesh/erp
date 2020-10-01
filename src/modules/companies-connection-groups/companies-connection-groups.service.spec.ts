import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConnectionGroupsService } from './companies-connection-groups.service';

describe('CompaniesConnectionGroupsService', () => {
  let service: CompaniesConnectionGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesConnectionGroupsService],
    }).compile();

    service = module.get<CompaniesConnectionGroupsService>(CompaniesConnectionGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
