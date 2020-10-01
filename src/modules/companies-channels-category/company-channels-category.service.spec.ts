import { Test, TestingModule } from '@nestjs/testing';
import { CompanyChannelsCategoryService } from './company-channels-category.service';

describe('CompanyChannelsCategoryService', () => {
  let service: CompanyChannelsCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyChannelsCategoryService],
    }).compile();

    service = module.get<CompanyChannelsCategoryService>(CompanyChannelsCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
