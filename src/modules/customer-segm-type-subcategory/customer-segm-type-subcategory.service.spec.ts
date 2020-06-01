import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSegmTypeSubcategoryService } from './customer-segm-type-subcategory.service';

describe('CustomerSegmTypeSubcategoryService', () => {
  let service: CustomerSegmTypeSubcategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerSegmTypeSubcategoryService],
    }).compile();

    service = module.get<CustomerSegmTypeSubcategoryService>(CustomerSegmTypeSubcategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
