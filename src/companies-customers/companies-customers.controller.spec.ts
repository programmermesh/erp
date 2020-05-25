import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCustomersController } from './companies-customers.controller';

describe('CompaniesCustomers Controller', () => {
  let controller: CompaniesCustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesCustomersController],
    }).compile();

    controller = module.get<CompaniesCustomersController>(CompaniesCustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
