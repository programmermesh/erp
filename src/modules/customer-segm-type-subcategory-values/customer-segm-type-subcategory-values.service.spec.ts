import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSegmTypeSubcategoryValuesService } from './customer-segm-type-subcategory-values.service';

describe('CustomerSegmTypeSubcategoryValuesService', () => {
  let service: CustomerSegmTypeSubcategoryValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerSegmTypeSubcategoryValuesService],
    }).compile();

    service = module.get<CustomerSegmTypeSubcategoryValuesService>(CustomerSegmTypeSubcategoryValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
