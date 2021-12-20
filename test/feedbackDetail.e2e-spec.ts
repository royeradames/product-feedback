import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import db from '../src/db/dbConfig';
import { Comment, Reply } from '../src/comments/comments.service';

describe('feedback detail page', () => {
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

  // get a feedback by id
  it('get a feedback by id', async () => {
    const res = await request(app.getHttpServer()).get(`/feedback/1`);
    expect(res.status).toBe(200);
    // check that all the feedback the spected fields
    expect(res.body).toMatchObject({
      productRequestsId: expect.any(Number),
      title: expect.any(String),
      category: expect.any(String),
      upvotes: expect.any(Number),
      status: expect.any(String),
      description: expect.any(String),
    });
  });
  // get feedback comments and replies
  it('get feedback comments and replies', async () => {
    const res = await request(app.getHttpServer()).get(`/feedback/1/comments`);
    expect(res.status).toBe(200);
    // check that all the feedback comments and replies have the spected fields
    res.body?.forEach((comment) => {
      expect(comment).toMatchObject({
        commentsId: expect.any(Number),
        productRequestsId: expect.any(Number),
        content: expect.any(String),
        replyingTo: expect.any(String),
        userId: expect.any(Number),
      });
    });
  });
  // create new comment

  it('create new comment', async () => {
    const newComment: Comment = {
      productRequestsId: 1,
      content: 'test',
      userId: 1,
    };

    const res = await request(app.getHttpServer())
      .post(`/comments`)
      .send(newComment);
    expect(res.status).toBe(201);
    // check that all the feedback comments and replies have the spected fields
    expect(res.body).toMatchObject({
      commentsId: expect.any(Number),
    });
  });
});
