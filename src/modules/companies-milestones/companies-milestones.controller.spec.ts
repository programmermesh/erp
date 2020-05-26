import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesMilestonesController } from './companies-milestones.controller';

describe('CompaniesMilestones Controller', () => {
  let controller: CompaniesMilestonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesMilestonesController],
    }).compile();

    controller = module.get<CompaniesMilestonesController>(CompaniesMilestonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
