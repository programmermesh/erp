import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPitchDecksFilesService } from './companies-pitch-decks-files.service';

describe('CompaniesPitchDecksFilesService', () => {
  let service: CompaniesPitchDecksFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesPitchDecksFilesService],
    }).compile();

    service = module.get<CompaniesPitchDecksFilesService>(CompaniesPitchDecksFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
