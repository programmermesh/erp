import { Test, TestingModule } from '@nestjs/testing';
import { IncomeBracketsService } from './income-brackets.service';

describe('IncomeBracketsService', () => {
  let service: IncomeBracketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomeBracketsService],
    }).compile();

    service = module.get<IncomeBracketsService>(IncomeBracketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
