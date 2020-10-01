import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSegmentationTypeService } from './customer-segmentation-type.service';

describe('CustomerSegmentationTypeService', () => {
  let service: CustomerSegmentationTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerSegmentationTypeService],
    }).compile();

    service = module.get<CustomerSegmentationTypeService>(CustomerSegmentationTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
