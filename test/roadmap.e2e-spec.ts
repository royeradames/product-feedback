import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import db from '../src/db/dbConfig';

describe('roadmap page (e2e)', () => {
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

  it('render feedback planned', async () => {
    const res = await request(app.getHttpServer()).get(
      `/feedback/status/planned`,
    );
    expect(res.status).toBe(200);
    // check that all the feedback the spected fields
    res.body?.forEach((feedback) => {
      expect(feedback).toMatchObject({
        productRequestsId: expect.any(Number),
        title: expect.any(String),
        category: expect.any(String),
        upvotes: expect.any(Number),
        status: expect.any(String),
        description: expect.any(String),
      });
    });
  });
});