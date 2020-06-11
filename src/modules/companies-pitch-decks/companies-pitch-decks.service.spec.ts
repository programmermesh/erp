import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPitchDecksService } from './companies-pitch-decks.service';

describe('CompaniesPitchDecksService', () => {
  let service: CompaniesPitchDecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesPitchDecksService],
    }).compile();

    service = module.get<CompaniesPitchDecksService>(CompaniesPitchDecksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
