import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCostAndRevenuesService } from './companies-cost-and-revenues.service';

describe('CompaniesCostAndRevenuesService', () => {
  let service: CompaniesCostAndRevenuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesCostAndRevenuesService],
    }).compile();

    service = module.get<CompaniesCostAndRevenuesService>(CompaniesCostAndRevenuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
