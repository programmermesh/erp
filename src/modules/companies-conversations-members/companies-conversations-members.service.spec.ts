import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConversationsMembersService } from './companies-conversations-members.service';

describe('CompaniesConversationsMembersService', () => {
  let service: CompaniesConversationsMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesConversationsMembersService],
    }).compile();

    service = module.get<CompaniesConversationsMembersService>(CompaniesConversationsMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
