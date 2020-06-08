import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesUserRolesService } from './companies-user-roles.service';

describe('CompaniesUserRolesService', () => {
  let service: CompaniesUserRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesUserRolesService],
    }).compile();

    service = module.get<CompaniesUserRolesService>(CompaniesUserRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
