import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCustomersProblemsController } from './companies-customers-problems.controller';

describe('CompaniesCustomersProblems Controller', () => {
  let controller: CompaniesCustomersProblemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesCustomersProblemsController],
    }).compile();

    controller = module.get<CompaniesCustomersProblemsController>(CompaniesCustomersProblemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
