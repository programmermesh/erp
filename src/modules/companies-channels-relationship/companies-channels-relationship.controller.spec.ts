import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesChannelsRelationshipController } from './companies-channels-relationship.controller';

describe('CompaniesChannelsRelationship Controller', () => {
  let controller: CompaniesChannelsRelationshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesChannelsRelationshipController],
    }).compile();

    controller = module.get<CompaniesChannelsRelationshipController>(CompaniesChannelsRelationshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
