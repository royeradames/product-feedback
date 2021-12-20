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
}
