import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesMarketPotentialCustomersController } from './companies-market-potential-customers.controller';

describe('CompaniesMarketPotentialCustomers Controller', () => {
  let controller: CompaniesMarketPotentialCustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesMarketPotentialCustomersController],
    }).compile();

    controller = module.get<CompaniesMarketPotentialCustomersController>(CompaniesMarketPotentialCustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
