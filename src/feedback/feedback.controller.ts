import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { FeedbackService, NewFeedback, EditFeedback } from './feedback.service';
import FeedbackValitation from './feedbackValidation';
@Controller('/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('/:feedbackId')
  async getFeedbackById(
    @Res() res,
    @Param('feedbackId') productRequestsId: number,
  ) {
    const feedbackValiation = new FeedbackValitation();
    feedbackValiation.productRequestsId = productRequestsId;
    try {
      await validateOrReject(feedbackValiation, {
        skipMissingProperties: true,
      });
    } catch (errors) {
      res.status(422).json(errors);
    }
    /* get feedback */
    try {
      const feedback = await this.feedbackService.getFeedbackById(
        productRequestsId,
      );
      res.status(200).json(feedback);
    } catch (error) {
      res.status(404).json({ message: 'There was an error.' });
    }
  }
  @Get('/:productRequestsId/comments')
  async getFeedbackComments(
    @Res() res,
    @Param('productRequestsId') productRequestsId: number,
  ) {
    /* validation */
    const feedbackValiation = new FeedbackValitation();
    feedbackValiation.productRequestsId = productRequestsId;
    try {
      await validateOrReject(feedbackValiation, {
        skipMissingProperties: true,
      });
    } catch (errors) {
      res.status(422).json(errors);
    }

    /* get feedback comments */
    try {
      const comments = await this.feedbackService.getFeedbackComments(
        productRequestsId,
      );
      res.status(200).json(comments);
    } catch (error) {
      res.status(404).json({ message: 'There was an error.' });
    }
  }
  @Post()
  async createFeedback(
    @Res() res,
    @Body('title') title: NewFeedback['title'],
    @Body('description') description: NewFeedback['description'],
    @Body('category') category: NewFeedback['category'],
  ) {
    /* validation */
    const feedbackValitation = new FeedbackValitation();
    feedbackValitation.title = title;
    feedbackValitation.description = description;
    feedbackValitation.category = category;
    try {
      await validateOrReject(feedbackValitation, {
        skipMissingProperties: true,
      });
    } catch (errors) {
      res.status(422).json(errors);
    }

    /* create feedback */
    const newFeedback: NewFeedback = {
      title,
      description,
      category,
    };

    try {
      const feedbackId = await this.feedbackService.createFeedback(newFeedback);
      res.status(201).json({ productRequestsId: feedbackId });
    } catch (error) {
      res.status(404).json(error);
    }
  }
  @Put('/:productRequestsId')
  async updateFeedback(
    @Res() res,
    @Param('productRequestsId') productRequestsId: number,
    @Body('title') title: EditFeedback['title'],
    @Body('description') description: EditFeedback['description'],
    @Body('category') category: EditFeedback['category'],
    @Body('status') status: EditFeedback['status'],
  ) {
    /* validation */
    const feedbackValitation = new FeedbackValitation();
    feedbackValitation.productRequestsId = productRequestsId;
    // validate a value that as been changed
    if (title) feedbackValitation.title = title;
    if (description) feedbackValitation.description = description;
    if (title) feedbackValitation.category = category;
    if (status) feedbackValitation.status = status;
    const noNewFields = !title && !description && !category && !status;
    if (noNewFields) res.status(422).json({ message: 'No fields to update' });
    // apply validation
    try {
      await validateOrReject(feedbackValitation, {
        skipMissingProperties: true,
      });
    } catch (errors) {
      res.status(422).json(errors);
    }
    const newFeedback: EditFeedback = {
      title,
      description,
      category,
      status,
    };

    try {
      const updateMessage = await this.feedbackService.updateFeedback(
        productRequestsId,
        newFeedback,
      );
      res.status(200).json(updateMessage);
    } catch (error) {
      res.status(404).json(error);
    }
  }
  @Delete('/:productRequestsId')
  async deleteFeedback(
    @Res() res,
    @Param('productRequestsId') productRequestsId: number,
  ) {
    /* validation */
    const feedbackValitation = new FeedbackValitation();
    feedbackValitation.productRequestsId = productRequestsId;
    try {
      await validateOrReject(feedbackValitation, {
        skipMissingProperties: true,
      });
    } catch (errors) {
      res.status(422).json(errors);
    }

    /* delete feedback */
    try {
      const SuccessMessage = await this.feedbackService.deleteFeedback(
        productRequestsId,
      );
      res.status(200).json(SuccessMessage);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}
