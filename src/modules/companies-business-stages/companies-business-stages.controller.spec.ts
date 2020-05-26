import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesBusinessStagesController } from './companies-business-stages.controller';

describe('CompaniesBusinessStages Controller', () => {
  let controller: CompaniesBusinessStagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesBusinessStagesController],
    }).compile();

    controller = module.get<CompaniesBusinessStagesController>(CompaniesBusinessStagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
