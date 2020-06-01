import { Test, TestingModule } from '@nestjs/testing';
import { EducationStagesService } from './education-stages.service';

describe('EducationStagesService', () => {
  let service: EducationStagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationStagesService],
    }).compile();

    service = module.get<EducationStagesService>(EducationStagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
