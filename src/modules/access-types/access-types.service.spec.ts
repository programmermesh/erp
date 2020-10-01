import { Test, TestingModule } from '@nestjs/testing';
import { AccessTypesService } from './access-types.service';

describe('AccessTypesService', () => {
  let service: AccessTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessTypesService],
    }).compile();

    service = module.get<AccessTypesService>(AccessTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
