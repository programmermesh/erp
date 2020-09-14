import { Test, TestingModule } from '@nestjs/testing';
import { CompanyChannelsService } from './company-channels.service';

describe('CompanyChannelsService', () => {
  let service: CompanyChannelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyChannelsService],
    }).compile();

    service = module.get<CompanyChannelsService>(CompanyChannelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
