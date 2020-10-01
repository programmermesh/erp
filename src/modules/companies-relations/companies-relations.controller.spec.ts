import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesRelationsController } from './companies-relations.controller';

describe('CompaniesRelations Controller', () => {
  let controller: CompaniesRelationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesRelationsController],
    }).compile();

    controller = module.get<CompaniesRelationsController>(CompaniesRelationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
