import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSegmTypeSubcategoryValuesController } from './customer-segm-type-subcategory-values.controller';

describe('CustomerSegmTypeSubcategoryValues Controller', () => {
  let controller: CustomerSegmTypeSubcategoryValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerSegmTypeSubcategoryValuesController],
    }).compile();

    controller = module.get<CustomerSegmTypeSubcategoryValuesController>(CustomerSegmTypeSubcategoryValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
