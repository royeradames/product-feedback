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
}
