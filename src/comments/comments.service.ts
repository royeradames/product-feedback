import { Injectable } from '@nestjs/common';
import db from '../db/dbConfig';
export type Comment = {
  productRequestsId: number;
  content: string;
  userId: number;
};
export interface Reply extends Comment {
  replyingTo: string;
}
@Injectable()
export class CommentsService {
  // create a comment
  async createComment(comment: Comment) {
    try {
      const [newCommentId] = await db('comments').insert(comment);
      return newCommentId;
    } catch (error) {
      throw error(error);
    }
  }
  // delete a comment
  async deleteComment(commentId: number) {
    try {
      const deletedCommentId = await db('comments').where({ commentId }).del();
      return deletedCommentId;
    } catch (error) {
      throw error(error);
    }
  }
  // create a repl
  async createReply(reply: Reply) {
    try {
      const [newReplyId] = await db('comments').insert(reply);
      return newReplyId;
    } catch (error) {
      throw error(error);
    }
  }
}
