import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConnectedHubController } from './companies-connected-hub.controller';

describe('CompaniesConnectedHub Controller', () => {
  let controller: CompaniesConnectedHubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesConnectedHubController],
    }).compile();

    controller = module.get<CompaniesConnectedHubController>(CompaniesConnectedHubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
