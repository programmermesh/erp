import { Test, TestingModule } from '@nestjs/testing';
import { CompanyChannelsCategoryController } from './company-channels-category.controller';

describe('CompanyChannelsCategory Controller', () => {
  let controller: CompanyChannelsCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyChannelsCategoryController],
    }).compile();

    controller = module.get<CompanyChannelsCategoryController>(CompanyChannelsCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
