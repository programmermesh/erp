import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesUserRolesController } from './companies-user-roles.controller';

describe('CompaniesUserRoles Controller', () => {
  let controller: CompaniesUserRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesUserRolesController],
    }).compile();

    controller = module.get<CompaniesUserRolesController>(CompaniesUserRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
