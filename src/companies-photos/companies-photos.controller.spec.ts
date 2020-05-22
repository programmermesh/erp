import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPhotosController } from './companies-photos.controller';

describe('CompaniesPhotos Controller', () => {
  let controller: CompaniesPhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesPhotosController],
    }).compile();

    controller = module.get<CompaniesPhotosController>(CompaniesPhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
