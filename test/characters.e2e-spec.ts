import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CharactersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/characters (GET)', () => {
    it('should return 200 and an array of characters', () => {
      return request(app.getHttpServer())
        .get('/characters')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('should return characters with expected structure', () => {
      return request(app.getHttpServer())
        .get('/characters')
        .expect(200)
        .expect((res) => {
          if (res.body.length > 0) {
            const character = res.body[0];
            expect(character).toHaveProperty('id');
            expect(character).toHaveProperty('name');
            expect(character).toHaveProperty('birthday_season');
            expect(character).toHaveProperty('birthday_day');
            expect(character).toHaveProperty('character_image');
            expect(character).toHaveProperty('lives_in');
            expect(character).toHaveProperty('address');
            expect(character).toHaveProperty('can_marriage');
            expect(character).toHaveProperty('clinic_visit_season');
            expect(character).toHaveProperty('clinic_visit_day');
            expect(character).toHaveProperty('loved_gifts');
            expect(character).toHaveProperty('family');
          }
        });
    });

    it('should return an empty array when no characters exist', () => {
      return request(app.getHttpServer())
        .get('/characters')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });

  describe('/characters/:id (GET)', () => {
    it('should return 200 and a character object when valid id is provided', () => {
      return request(app.getHttpServer())
        .get('/characters/1')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('name');
          expect(res.body).toHaveProperty('birthday_season');
          expect(res.body).toHaveProperty('birthday_day');
          expect(res.body).toHaveProperty('character_image');
          expect(res.body).toHaveProperty('lives_in');
          expect(res.body).toHaveProperty('address');
          expect(res.body).toHaveProperty('can_marriage');
          expect(res.body).toHaveProperty('clinic_visit_season');
          expect(res.body).toHaveProperty('clinic_visit_day');
          expect(res.body).toHaveProperty('loved_gifts');
          expect(res.body).toHaveProperty('family');
        });
    });

    it('should return character with correct id', () => {
      return request(app.getHttpServer())
        .get('/characters/1')
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(1);
        });
    });

    it('should return 404 when character is not found', () => {
      return request(app.getHttpServer()).get('/characters/999999').expect(404);
    });

    it('should return 400 when invalid id format is provided', () => {
      return request(app.getHttpServer())
        .get('/characters/invalid')
        .expect(400);
    });

    it('should return 400 when float id is provided', () => {
      return request(app.getHttpServer()).get('/characters/1.5').expect(400);
    });

    it('should return 400 when negative id is provided', () => {
      return request(app.getHttpServer()).get('/characters/-1').expect(400);
    });

    it('should return 400 when string id is provided', () => {
      return request(app.getHttpServer()).get('/characters/abc').expect(400);
    });
  });

  describe('/characters/:id edge cases', () => {
    it('should return 404 for very large non-existent id', () => {
      return request(app.getHttpServer())
        .get('/characters/999999999')
        .expect(404);
    });

    it('should handle id of 0', () => {
      return request(app.getHttpServer()).get('/characters/0').expect(404);
    });
  });
});
