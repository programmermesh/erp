import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesTeamMembersController } from './companies-team-members.controller';

describe('CompaniesTeamMembers Controller', () => {
  let controller: CompaniesTeamMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesTeamMembersController],
    }).compile();

    controller = module.get<CompaniesTeamMembersController>(CompaniesTeamMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
