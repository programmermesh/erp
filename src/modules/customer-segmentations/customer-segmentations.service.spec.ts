import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSegmentationsService } from './customer-segmentations.service';

describe('CustomerSegmentationsService', () => {
  let service: CustomerSegmentationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerSegmentationsService],
    }).compile();

    service = module.get<CustomerSegmentationsService>(CustomerSegmentationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
