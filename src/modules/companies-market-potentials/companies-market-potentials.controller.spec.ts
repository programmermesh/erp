import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesMarketPotentialsController } from './companies-market-potentials.controller';

describe('CompaniesMarketPotentials Controller', () => {
  let controller: CompaniesMarketPotentialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesMarketPotentialsController],
    }).compile();

    controller = module.get<CompaniesMarketPotentialsController>(CompaniesMarketPotentialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
