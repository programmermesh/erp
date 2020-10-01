import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPitchDecksController } from './companies-pitch-decks.controller';

describe('CompaniesPitchDecks Controller', () => {
  let controller: CompaniesPitchDecksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesPitchDecksController],
    }).compile();

    controller = module.get<CompaniesPitchDecksController>(CompaniesPitchDecksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
