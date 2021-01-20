import { Injectable } from '@nestjs/common';
import { NewPhoto, Photo } from '../model/photo.db';
import { ClientConnection } from './schema.qb';

@Injectable()
export class PhotoQueryBuilder {
    constructor(
        private readonly clientConnection: ClientConnection,
    ) {
    }

    public async getPhotos(): Promise<Photo[] | Error> {
        const client = await this.clientConnection.getPool().connect();
        const clientQuery = await client.query('SELECT * FROM photos ORDER BY photoid ASC');
        client.end();
        return clientQuery.rows;
    }

    public async getPhotosByPersonId(personid: string): Promise<Photo[] | Error> {
        const client = await this.clientConnection.getPool().connect();
        const clientQuery = await client.query('SELECT * FROM photos WHERE personid = $1 ORDER BY photoid ASC', [personid]);
        client.end();
        return clientQuery.rows;
    }

    public async getPhotoById(photoid: string, personid: string): Promise<Photo | Error> {
        const client = await this.clientConnection.getPool().connect();
        const clientQuery = await client.query('SELECT * FROM photos WHERE photoid = $1 AND personid = $2', [photoid, personid]);
        client.end();
        return clientQuery.rows[0];
    }

    public async updatePhoto(photo: Photo): Promise<any | Error> {
        const client = await this.clientConnection.getPool().connect();
        await client.query('UPDATE photos SET description = $1 personid = $2 WHERE photoid = $3',
            [photo.description, photo.personid, photo.photoid]);
        client.end();
    }

    public async createPhoto(photo: NewPhoto): Promise<any | Error> {
        const client = await this.clientConnection.getPool().connect();
        await client.query('INSERT INTO photos (description, personid) VALUES ($1, $2)',
            [photo.description, photo.personid]);
        client.end();
    }

    public async deletePhoto(photoid: string): Promise<any | Error> {
        const client = await this.clientConnection.getPool().connect();
        await client.query('DELETE FROM photos WHERE photoid = $1', [photoid]);
        client.end();
    }

}
