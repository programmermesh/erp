import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConversationsService } from './companies-conversations.service';

describe('CompaniesConversationsService', () => {
  let service: CompaniesConversationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesConversationsService],
    }).compile();

    service = module.get<CompaniesConversationsService>(CompaniesConversationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
