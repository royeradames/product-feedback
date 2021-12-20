import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import db from '../src/db/dbConfig';
import { EditFeedback } from '../src/feedback/feedback.service';

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

  const editFeedbackId = 12;
  describe('edit feedback', () => {
    const editFeedbacks: {
      description: string;
      userInput: EditFeedback;
      newFeedbackId: number;
    }[] = [
      {
        description: 'title and details ',
        userInput: {
          title: 'title can be change to something else',
          description: 'same as description',
          // front end will populate the fields with the old data
          category: 'feature',
          status: 'suggestion',
        },
        newFeedbackId: 0,
      },
      {
        description: 'change category and status to  enhancement, and planned',
        userInput: {
          title: 'same title',
          category: 'enhancement',
          description: 'same description',
          status: 'planned',
        },
        newFeedbackId: 0,
      },
      {
        description: 'change category and status to  bug, and in-progress',
        userInput: {
          title: 'same title',
          category: 'bug',
          description: 'same description',
          status: 'in-progress',
        },
        newFeedbackId: 0,
      },
      {
        description: 'change category and status to  feature, and live',
        userInput: {
          title: 'same title',
          category: 'feature',
          description: 'same description',
          status: 'live',
        },
        newFeedbackId: 0,
      },
      {
        description: 'change status to suggestion',
        userInput: {
          title: 'same title',
          category: 'feature',
          description: 'same description',
          status: 'suggestion',
        },
        newFeedbackId: 0,
      },
    ];
    editFeedbacks.forEach(async (editFeedback) => {
      describe(`${editFeedback.description}`, () => {
        it(`edit a new feedback`, async () => {
          const createdFeedback = await request(app.getHttpServer())
            .put(`/feedback/${editFeedbackId}`)
            .send(editFeedback.userInput);
          // check that the feedback has been created
          expect(createdFeedback.body).toMatchObject({
            message: 'Feedback updated successfully',
          });
          expect(createdFeedback.status).toBe(200);
        });
        it(`change took effect`, async () => {
          const res = await request(app.getHttpServer()).get(
            `/feedback/${editFeedbackId}`,
          );
          expect(res.status).toBe(200);
          expect(res.body).toMatchObject({
            productRequestsId: editFeedbackId,
            title: editFeedback.userInput.title,
            description: editFeedback.userInput.description,
            category: editFeedback.userInput.category,
            status: editFeedback.userInput.status,
          });
        });
      });
    });
  });
  it('delete feedback', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/feedback/${editFeedbackId}`,
    );
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: 'Feedback deleted successfully',
    });
  });
});
