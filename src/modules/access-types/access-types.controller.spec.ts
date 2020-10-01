import { Test, TestingModule } from '@nestjs/testing';
import { AccessTypesController } from './access-types.controller';

describe('AccessTypes Controller', () => {
  let controller: AccessTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessTypesController],
    }).compile();

    controller = module.get<AccessTypesController>(AccessTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
