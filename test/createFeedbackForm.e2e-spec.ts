import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import db from '../src/db/dbConfig';
import { NewFeedback } from '../src/feedback/feedback.service';

describe('Create Feedback Form (e2e)', () => {
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

  const newFeedbacks: {
    name: 'feature' | 'enhancement' | 'bug';
    input: NewFeedback;
    newFeedbackId: number;
  }[] = [
    {
      name: 'feature',
      input: {
        title: 'feature',
        category: 'feature',
        description: 'feature',
      },
      newFeedbackId: 0,
    },
    {
      name: 'enhancement',
      input: {
        title: 'enhancement',
        category: 'enhancement',
        description: 'enhancement',
      },
      newFeedbackId: 0,
    },
    {
      name: 'bug',
      input: {
        title: 'bug',
        category: 'bug',
        description: 'bug',
      },
      newFeedbackId: 0,
    },
  ];
  newFeedbacks.forEach(async (newFeedback) => {
    describe(`${newFeedback.name} feedback`, () => {
      it(`create a new feedback`, async () => {
        const createdFeedback = await request(app.getHttpServer())
          .post(`/feedback`)
          .send(newFeedback.input);
        // check that the feedback has been created
        expect(createdFeedback.body).toMatchObject({
          productRequestsId: expect.any(Number),
        });
        expect(createdFeedback.status).toBe(201);

        //store the feedback id
        newFeedback.newFeedbackId = createdFeedback.body.productRequestsId;
      });
      it(`created feedback can be call as expected`, async () => {
        const res = await request(app.getHttpServer()).get(
          `/feedback/${newFeedback.newFeedbackId}`,
        );
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
          productRequestsId: expect.any(Number),
          title: expect.any(String),
          description: expect.any(String),
          category: expect.any(String),
          status: expect.any(String),
        });
      });
    });
  });
});
