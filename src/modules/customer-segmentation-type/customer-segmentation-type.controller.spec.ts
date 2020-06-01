import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSegmentationTypeController } from './customer-segmentation-type.controller';

describe('CustomerSegmentationType Controller', () => {
  let controller: CustomerSegmentationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerSegmentationTypeController],
    }).compile();

    controller = module.get<CustomerSegmentationTypeController>(CustomerSegmentationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
