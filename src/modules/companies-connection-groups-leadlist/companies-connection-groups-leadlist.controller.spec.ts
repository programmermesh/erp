import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConnectionGroupsLeadlistController } from './companies-connection-groups-leadlist.controller';

describe('CompaniesConnectionGroupsLeadlist Controller', () => {
  let controller: CompaniesConnectionGroupsLeadlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesConnectionGroupsLeadlistController],
    }).compile();

    controller = module.get<CompaniesConnectionGroupsLeadlistController>(CompaniesConnectionGroupsLeadlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
