import { Test, TestingModule } from '@nestjs/testing';
import { BusinessSectorsService } from './business-sectors.service';

describe('BusinessSectorsService', () => {
  let service: BusinessSectorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessSectorsService],
    }).compile();

    service = module.get<BusinessSectorsService>(BusinessSectorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
