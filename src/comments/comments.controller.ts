import { Controller } from '@nestjs/common';
import { Body, Post, Res } from '@nestjs/common';
import { Comment } from './comments.service';
import { validateOrReject } from 'class-validator';
import { CommentsService } from './comments.service';
import CommentsValidation from './commentsValidation';
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  /* /comments */
  @Post()
  async createComment(
    @Res() res,
    @Body('productRequestsId') productRequestsId: Comment['productRequestsId'],
    @Body('content') content: Comment['content'],
    @Body('userId') userId: Comment['userId'],
  ) {
    /* validation */
    const commentValiation = new CommentsValidation();
    commentValiation.productRequestsId = productRequestsId;
    commentValiation.content = content;
    commentValiation.userId = userId;
    try {
      await validateOrReject(commentValiation, {
        skipMissingProperties: true,
      });
    } catch (errors) {
      res.status(422).json(errors);
    }

    /* create comment */
    try {
      const comment: Comment = {
        productRequestsId,
        content,
        userId,
      };
      const newComment = await this.commentsService.createComment(comment);
      res.status(201).json({ commentsId: newComment });
    } catch (error) {
      res.status(404).json(error);
    }
  }
}
