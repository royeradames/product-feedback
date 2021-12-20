import { Injectable } from '@nestjs/common';
export type Comment = {
  productRequestsId: number;
  content: string;
  userId: number;
};
export interface Reply extends Comment {
  replyingTo: string;
}
@Injectable()
export class CommentsService {}
