import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesMarketPotentialFilesController } from './companies-market-potential-files.controller';

describe('CompaniesMarketPotentialFiles Controller', () => {
  let controller: CompaniesMarketPotentialFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesMarketPotentialFilesController],
    }).compile();

    controller = module.get<CompaniesMarketPotentialFilesController>(CompaniesMarketPotentialFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
