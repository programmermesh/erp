import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesResourcesActivitiesPartnersService } from './companies-resources-activities-partners.service';

describe('CompaniesResourcesActivitiesPartnersService', () => {
  let service: CompaniesResourcesActivitiesPartnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesResourcesActivitiesPartnersService],
    }).compile();

    service = module.get<CompaniesResourcesActivitiesPartnersService>(CompaniesResourcesActivitiesPartnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
