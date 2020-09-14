import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesChannelsRelationshipService } from './companies-channels-relationship.service';

describe('CompaniesChannelsRelationshipService', () => {
  let service: CompaniesChannelsRelationshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesChannelsRelationshipService],
    }).compile();

    service = module.get<CompaniesChannelsRelationshipService>(CompaniesChannelsRelationshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
