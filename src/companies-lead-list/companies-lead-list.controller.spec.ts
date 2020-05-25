import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesLeadListController } from './companies-lead-list.controller';

describe('CompaniesLeadList Controller', () => {
  let controller: CompaniesLeadListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesLeadListController],
    }).compile();

    controller = module.get<CompaniesLeadListController>(CompaniesLeadListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
