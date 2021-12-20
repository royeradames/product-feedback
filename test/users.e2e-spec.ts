import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import db from '../src/db/dbConfig';
import { User } from '../src/users/users.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    /* reset db  */
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /* users */
  describe('/users', () => {
    const newUser: User = {
      name: 'Test User',
      username: 'testuser',
      image: 'assets/testing.png',
    };
    it('current user (GET)', async () => {
      const res = await request(app.getHttpServer()).get('/users/current');
      expect(res.status).toBe(200);

      expect(res.body).toMatchObject({
        userId: expect.any(Number),
        image: expect.any(String),
        name: expect.any(String),
        username: expect.any(String),
      });
    });
    it('create (post), select by id (get), and delete user (delete)', async () => {
      /* create a new user */
      const res = await request(app.getHttpServer())
        .post('/users')
        .send(newUser);
      expect(res.status).toBeGreaterThanOrEqual(200);
      expect(res.status).toBeLessThan(300);

      /* check that the user as been created */
      const newUserId = res.body[0];
      const createdUser = await request(app.getHttpServer()).get(
        `/users/${newUserId}`,
      );
      expect(createdUser.body).toMatchObject({
        userId: expect.any(Number),
        image: expect.any(String),
        name: expect.any(String),
        username: expect.any(String),
      });

      /* delete the user */
      const deleteUser = await request(app.getHttpServer()).delete(
        `/users/${newUserId}`,
      );
      const deletedUserStatus = deleteUser.status;
      expect(deletedUserStatus).toBeGreaterThanOrEqual(200);
      expect(deletedUserStatus).toBeLessThan(300);
    });
  });
});
