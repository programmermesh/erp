import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesBusinessSectorsController } from './companies-business-sectors.controller';

describe('CompaniesBusinessSectors Controller', () => {
  let controller: CompaniesBusinessSectorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesBusinessSectorsController],
    }).compile();

    controller = module.get<CompaniesBusinessSectorsController>(CompaniesBusinessSectorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
