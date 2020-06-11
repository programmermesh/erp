import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConnectionsService } from './companies-connections.service';

describe('CompaniesConnectionsService', () => {
  let service: CompaniesConnectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesConnectionsService],
    }).compile();

    service = module.get<CompaniesConnectionsService>(CompaniesConnectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
