import { Test, TestingModule } from '@nestjs/testing';
import { SegmentationsService } from './segmentations.service';

describe('SegmentationsService', () => {
  let service: SegmentationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SegmentationsService],
    }).compile();

    service = module.get<SegmentationsService>(SegmentationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
