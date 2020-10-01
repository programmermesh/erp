import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPitchDecksFilesController } from './companies-pitch-decks-files.controller';

describe('CompaniesPitchDecksFiles Controller', () => {
  let controller: CompaniesPitchDecksFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesPitchDecksFilesController],
    }).compile();

    controller = module.get<CompaniesPitchDecksFilesController>(CompaniesPitchDecksFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
