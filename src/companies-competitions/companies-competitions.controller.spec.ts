import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCompetitionsController } from './companies-competitions.controller';

describe('CompaniesCompetitions Controller', () => {
  let controller: CompaniesCompetitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesCompetitionsController],
    }).compile();

    controller = module.get<CompaniesCompetitionsController>(CompaniesCompetitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
