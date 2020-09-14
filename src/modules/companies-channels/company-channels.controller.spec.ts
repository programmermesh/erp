import { Test, TestingModule } from '@nestjs/testing';
import { CompanyChannelsController } from './company-channels.controller';

describe('CompanyChannels Controller', () => {
  let controller: CompanyChannelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyChannelsController],
    }).compile();

    controller = module.get<CompanyChannelsController>(CompanyChannelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
