import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCostAndRevenuesController } from './companies-cost-and-revenues.controller';

describe('CompaniesCostAndRevenues Controller', () => {
  let controller: CompaniesCostAndRevenuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesCostAndRevenuesController],
    }).compile();

    controller = module.get<CompaniesCostAndRevenuesController>(CompaniesCostAndRevenuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
