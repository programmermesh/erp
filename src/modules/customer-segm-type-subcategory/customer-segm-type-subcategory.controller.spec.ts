import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSegmTypeSubcategoryController } from './customer-segm-type-subcategory.controller';

describe('CustomerSegmTypeSubcategory Controller', () => {
  let controller: CustomerSegmTypeSubcategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerSegmTypeSubcategoryController],
    }).compile();

    controller = module.get<CustomerSegmTypeSubcategoryController>(CustomerSegmTypeSubcategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
