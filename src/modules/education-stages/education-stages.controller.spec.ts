import { Test, TestingModule } from '@nestjs/testing';
import { EducationStagesController } from './education-stages.controller';

describe('EducationStages Controller', () => {
  let controller: EducationStagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationStagesController],
    }).compile();

    controller = module.get<EducationStagesController>(EducationStagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
