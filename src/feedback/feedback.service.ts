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
}
