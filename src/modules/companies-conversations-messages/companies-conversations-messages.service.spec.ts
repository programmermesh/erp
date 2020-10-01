import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConversationsMessagesService } from './companies-conversations-messages.service';

describe('CompaniesConversationsMessagesService', () => {
  let service: CompaniesConversationsMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesConversationsMessagesService],
    }).compile();

    service = module.get<CompaniesConversationsMessagesService>(CompaniesConversationsMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
