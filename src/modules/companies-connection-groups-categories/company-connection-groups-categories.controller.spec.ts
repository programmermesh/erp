import { Test, TestingModule } from '@nestjs/testing';
import { CompanyConnectionGroupsCategoriesController } from './company-connection-groups-categories.controller';

describe('CompanyConnectionGroupsCategories Controller', () => {
  let controller: CompanyConnectionGroupsCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyConnectionGroupsCategoriesController],
    }).compile();

    controller = module.get<CompanyConnectionGroupsCategoriesController>(CompanyConnectionGroupsCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
