import { Injectable } from '@nestjs/common';
import db from '../db/dbConfig';

export type NewFeedback = {
  title: string;
  category: 'feature' | 'enhancement' | 'bug' | 'UI' | 'UX';
  description: string;
};
export interface EditFeedback extends NewFeedback {
  status: 'suggestion' | 'planned' | 'in-progress' | 'live';
}

export interface Feedback extends EditFeedback {
  upvotes: number;
}

@Injectable()
export class FeedbackService {
  async getFeedbackById(productRequestsId: number) {
    try {
      const feedback = await db('productRequests')
        .where({ productRequestsId })
        .first();
      if (!feedback) throw new Error("Feedback doesn't exist");

      return feedback;
    } catch (error) {
      throw new Error('There was an error');
    }
  }

  // get all feedbacks with status of planned
  getfeedbackStatusInProgress() {
    try {
      return db('productRequests').where({ status: 'in-progress' });
    } catch (error) {
      return { message: 'There was an error' };
    }
  }
  // get all productFeedback with status of live
  getFeedbackStatusLive() {
    try {
      return db('productRequests').where({ status: 'live' });
    } catch (error) {
      return { message: 'There was an error' };
    }
  }

  // get feedback comments and replys
  async getFeedbackComments(productRequestsId: number) {
    try {
      const comments = await db('comments')
        .join('users', 'users.userId', 'comments.userId')
        .where({ productRequestsId });

      return comments;
    } catch (error) {
      return { message: 'There was an error' };
    }
  }
  // create a new feedback
  async createFeedback(newFeedbackInput: NewFeedback) {
    // initialize upvotes
    const newFeedback: Feedback = {
      ...newFeedbackInput,
      upvotes: 0,
      status: 'suggestion',
    };
    /* create new feedback */
    try {
      const [newFeedbackId] = await db('productRequests').insert(newFeedback);
      return newFeedbackId;
    } catch (error) {
      throw error(error);
    }
  }

  // update a feedback
  async updateFeedback(id: number, newFeedback: NewFeedback) {
    try {
      await db('productRequests')
        .where({ productRequestsId: id })
        .update(newFeedback);
      return { message: 'Feedback updated successfully' };
    } catch (error) {
      throw error(error);
    }
  }

  // delete feedback and all its comments
  async deleteFeedback(id: number) {
    try {
      await db('comments').where({ productRequestsId: id }).del();
      await db('productRequests').where({ productRequestsId: id }).del();
      return { message: 'Feedback deleted successfully' };
    } catch (error) {
      throw error(error);
    }
  }
}
