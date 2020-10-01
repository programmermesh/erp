import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConversationsMessagesController } from './companies-conversations-messages.controller';

describe('CompaniesConversationsMessages Controller', () => {
  let controller: CompaniesConversationsMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesConversationsMessagesController],
    }).compile();

    controller = module.get<CompaniesConversationsMessagesController>(CompaniesConversationsMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
