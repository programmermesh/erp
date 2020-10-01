import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesContractsController } from './companies-contracts.controller';

describe('CompaniesContracts Controller', () => {
  let controller: CompaniesContractsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesContractsController],
    }).compile();

    controller = module.get<CompaniesContractsController>(CompaniesContractsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
