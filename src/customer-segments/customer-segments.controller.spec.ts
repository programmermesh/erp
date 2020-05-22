import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSegmentsController } from './customer-segments.controller';

describe('CustomerSegments Controller', () => {
  let controller: CustomerSegmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerSegmentsController],
    }).compile();

    controller = module.get<CustomerSegmentsController>(CustomerSegmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
