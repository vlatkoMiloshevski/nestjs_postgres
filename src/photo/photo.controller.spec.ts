import { Test, TestingModule } from '@nestjs/testing';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { NewPhoto, Photo } from '../db/model/photo.db';

describe('AppController', () => {
  let photoController: PhotoController;
  let photo: Photo;
  let newPhoto: NewPhoto;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PhotoController],
      providers: [PhotoService],
    }).compile();

    photoController = app.get<PhotoController>(PhotoController);
    photo = { description: '', photoid: 1, personid: 1 };
    newPhoto = { description: '', personid: 1 };
  });

  describe('root', () => {
    it('should create', () => {
      expect(photoController.createPhoto(newPhoto)).toHaveBeenCalled();
    });
    it('should update', () => {
      expect(photoController.updatePhoto(photo)).toHaveBeenCalled();
    });
    it('should delete', () => {
      expect(photoController.deletePhoto(photo)).toHaveBeenCalled();
    });
    it('should getPhotosByPersonId', () => {
      expect(photoController.getPhotosByPersonId(photo.photoid)).toHaveBeenCalled();
    });
    it('should getPhotosByPersonId', () => {
      expect(photoController.getPhotoById(photo.photoid, photo.personid)).toHaveBeenCalled();
    });
    it('should getPersons', () => {
      expect(photoController.getPhotos()).toHaveBeenCalled();
    });
  });
});
