import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesContractFilesController } from './companies-contract-files.controller';

describe('CompaniesContractFiles Controller', () => {
  let controller: CompaniesContractFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesContractFilesController],
    }).compile();

    controller = module.get<CompaniesContractFilesController>(CompaniesContractFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
