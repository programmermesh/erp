import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesValuesController } from './companies-values.controller';

describe('CompaniesValues Controller', () => {
  let controller: CompaniesValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesValuesController],
    }).compile();

    controller = module.get<CompaniesValuesController>(CompaniesValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
