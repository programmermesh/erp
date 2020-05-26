import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCustomersSegmentationsController } from './companies-customers-segmentations.controller';

describe('CompaniesCustomersSegmentations Controller', () => {
  let controller: CompaniesCustomersSegmentationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesCustomersSegmentationsController],
    }).compile();

    controller = module.get<CompaniesCustomersSegmentationsController>(CompaniesCustomersSegmentationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
