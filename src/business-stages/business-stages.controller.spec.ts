import { Test, TestingModule } from '@nestjs/testing';
import { BusinessStagesController } from './business-stages.controller';

describe('BusinessStages Controller', () => {
  let controller: BusinessStagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessStagesController],
    }).compile();

    controller = module.get<BusinessStagesController>(BusinessStagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
