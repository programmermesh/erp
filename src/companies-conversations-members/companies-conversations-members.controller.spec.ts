import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConversationsMembersController } from './companies-conversations-members.controller';

describe('CompaniesConversationsMembers Controller', () => {
  let controller: CompaniesConversationsMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesConversationsMembersController],
    }).compile();

    controller = module.get<CompaniesConversationsMembersController>(CompaniesConversationsMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
