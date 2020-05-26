import { Test, TestingModule } from '@nestjs/testing';
import { RelationsController } from './relations.controller';

describe('Relations Controller', () => {
  let controller: RelationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelationsController],
    }).compile();

    controller = module.get<RelationsController>(RelationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
