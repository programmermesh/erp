import { Test, TestingModule } from '@nestjs/testing';
import { CompanyConnectionGroupsCategoriesService } from './company-connection-groups-categories.service';

describe('CompanyConnectionGroupsCategoriesService', () => {
  let service: CompanyConnectionGroupsCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyConnectionGroupsCategoriesService],
    }).compile();

    service = module.get<CompanyConnectionGroupsCategoriesService>(CompanyConnectionGroupsCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
