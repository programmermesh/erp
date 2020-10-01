import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPhotosService } from './companies-photos.service';

describe('CompaniesPhotosService', () => {
  let service: CompaniesPhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesPhotosService],
    }).compile();

    service = module.get<CompaniesPhotosService>(CompaniesPhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
