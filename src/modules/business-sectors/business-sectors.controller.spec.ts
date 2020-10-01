import { Test, TestingModule } from '@nestjs/testing';
import { BusinessSectorsController } from './business-sectors.controller';

describe('BusinessSectors Controller', () => {
  let controller: BusinessSectorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessSectorsController],
    }).compile();

    controller = module.get<BusinessSectorsController>(BusinessSectorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
