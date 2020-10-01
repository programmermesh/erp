import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSegmentationsController } from './customer-segmentations.controller';

describe('CustomerSegmentations Controller', () => {
  let controller: CustomerSegmentationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerSegmentationsController],
    }).compile();

    controller = module.get<CustomerSegmentationsController>(CustomerSegmentationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
