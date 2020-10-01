import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConnectionGroupsController } from './companies-connection-groups.controller';

describe('CompaniesConnectionGroups Controller', () => {
  let controller: CompaniesConnectionGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesConnectionGroupsController],
    }).compile();

    controller = module.get<CompaniesConnectionGroupsController>(CompaniesConnectionGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
