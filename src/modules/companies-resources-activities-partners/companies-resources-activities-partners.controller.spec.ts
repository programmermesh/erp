import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesResourcesActivitiesPartnersController } from './companies-resources-activities-partners.controller';

describe('CompaniesResourcesActivitiesPartners Controller', () => {
  let controller: CompaniesResourcesActivitiesPartnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesResourcesActivitiesPartnersController],
    }).compile();

    controller = module.get<CompaniesResourcesActivitiesPartnersController>(CompaniesResourcesActivitiesPartnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
