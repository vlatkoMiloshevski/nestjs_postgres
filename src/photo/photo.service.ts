import { Injectable } from '@nestjs/common';
import { NewPhoto, Photo } from 'src/db/model/photo.db';
import { PhotoQueryBuilder } from '../db/query-builder/photo.qb';

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoQueryBuilder: PhotoQueryBuilder
  ) {

  }

  getPhotos(): Promise<Photo[] | Error> {
    return this.photoQueryBuilder.getPhotos()
      .then(res => res)
      .catch((err) => { throw err });
  }

  getPhotosByPersonId(personid: string): Promise<Photo[] | Error> {
    return this.photoQueryBuilder.getPhotosByPersonId(personid)
      .then(res => res)
      .catch((err) => { throw err });
  }

  getPhotoById(photoid, personid): Promise<Photo | Error> {
    return this.photoQueryBuilder.getPhotoById(photoid, personid)
      .then(res => res)
      .catch((err) => { throw err });
  }

  updatePhoto(photoid): Promise<boolean | Error> {
    return this.photoQueryBuilder.updatePhoto(photoid)
      .then(() => true)
      .catch((err) => { throw err });
  }

  createPhoto(photo: NewPhoto): Promise<boolean | Error> {
    return this.photoQueryBuilder.createPhoto(photo)
      .then(() => true)
      .catch((err) => { throw err });
  }

  deletePhoto(photoid): Promise<boolean | Error> {
    return this.photoQueryBuilder.deletePhoto(photoid)
      .then(() => true)
      .catch((err) => { throw err });
  }
}
