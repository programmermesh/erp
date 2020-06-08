import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesBusinessSectorsService } from './companies-business-sectors.service';

describe('CompaniesBusinessSectorsService', () => {
  let service: CompaniesBusinessSectorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesBusinessSectorsService],
    }).compile();

    service = module.get<CompaniesBusinessSectorsService>(CompaniesBusinessSectorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
