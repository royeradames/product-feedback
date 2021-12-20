import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { FeedbackService, NewFeedback } from './feedback.service';
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
}
