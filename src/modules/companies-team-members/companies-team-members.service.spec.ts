import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesTeamMembersService } from './companies-team-members.service';

describe('CompaniesTeamMembersService', () => {
  let service: CompaniesTeamMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesTeamMembersService],
    }).compile();

    service = module.get<CompaniesTeamMembersService>(CompaniesTeamMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
