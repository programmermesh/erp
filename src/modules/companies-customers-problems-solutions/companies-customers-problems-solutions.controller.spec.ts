import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCustomersProblemsSolutionsController } from './companies-customers-problems-solutions.controller';

describe('CompaniesCustomersProblemsSolutions Controller', () => {
  let controller: CompaniesCustomersProblemsSolutionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesCustomersProblemsSolutionsController],
    }).compile();

    controller = module.get<CompaniesCustomersProblemsSolutionsController>(CompaniesCustomersProblemsSolutionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
