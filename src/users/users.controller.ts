import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { UsersService, User } from './users.service';
import usersValidation from './usersValidation';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/current')
  getCurrentUser() {
    return this.usersService.getCurrentUser();
  }
  @Get('/:userId')
  async getUserInfo(@Res() res, @Param('userId') userId: number) {
    /* validation */
    const userValidation = new usersValidation();
    userValidation.userId = userId;
    try {
      await validateOrReject(userValidation, {
        skipMissingProperties: true,
      });
    } catch (errors) {
      res.status(422).json(errors);
    }
    /* get user info */
    try {
      const user = await this.usersService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}
