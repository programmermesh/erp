import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesConnectionsController } from './companies-connections.controller';

describe('CompaniesConnections Controller', () => {
  let controller: CompaniesConnectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesConnectionsController],
    }).compile();

    controller = module.get<CompaniesConnectionsController>(CompaniesConnectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
