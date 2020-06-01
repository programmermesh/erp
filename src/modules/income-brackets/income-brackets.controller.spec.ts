import { Test, TestingModule } from '@nestjs/testing';
import { IncomeBracketsController } from './income-brackets.controller';

describe('IncomeBrackets Controller', () => {
  let controller: IncomeBracketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeBracketsController],
    }).compile();

    controller = module.get<IncomeBracketsController>(IncomeBracketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
