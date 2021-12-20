import { Injectable } from '@nestjs/common';
export type Comment = {
  productRequestsId: number;
  content: string;
  userId: number;
};
@Injectable()
export class CommentsService {}
