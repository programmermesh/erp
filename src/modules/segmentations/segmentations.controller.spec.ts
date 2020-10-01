import { Test, TestingModule } from '@nestjs/testing';
import { SegmentationsController } from './segmentations.controller';

describe('Segmentations Controller', () => {
  let controller: SegmentationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SegmentationsController],
    }).compile();

    controller = module.get<SegmentationsController>(SegmentationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
