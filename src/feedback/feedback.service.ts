import { Injectable } from '@nestjs/common';

export type NewFeedback = {
  title: string;
  category: 'feature' | 'enhancement' | 'bug' | 'UI' | 'UX';
  description: string;
};

@Injectable()
export class FeedbackService {}
