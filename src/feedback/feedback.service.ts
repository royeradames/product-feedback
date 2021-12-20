import { Injectable } from '@nestjs/common';

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
export class FeedbackService {}
