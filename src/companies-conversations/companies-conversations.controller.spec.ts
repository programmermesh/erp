import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConversationsController } from './companies-conversations.controller';

describe('CompaniesConversations Controller', () => {
  let controller: CompaniesConversationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesConversationsController],
    }).compile();

    controller = module.get<CompaniesConversationsController>(CompaniesConversationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
