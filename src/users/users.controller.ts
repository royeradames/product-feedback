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
  @Post()
  async createUser(
    @Res() res,
    @Body('image') image: User['image'],
    @Body('name') name: User['name'],
    @Body('username') username: User['username'],
  ) {
    /* validation */
    const userValidation = new usersValidation();
    userValidation.image = image;
    userValidation.name = name;
    userValidation.username = username;
    try {
      await validateOrReject(userValidation, {
        skipMissingProperties: true,
      });
    } catch (errors) {
      res.status(422).json(errors);
    }
    /* create new use */
    const user: User = {
      image,
      name,
      username,
    };
    try {
      const newUserId = await this.usersService.createUser(user);
      res.status(201).json(newUserId);
    } catch (error) {
      res.status(404).json(error);
    }
  }
  @Delete('/:userId')
  async deleteUser(@Res() res, @Param('userId') userId: number) {
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
    /* delete user by id */
    try {
      const deletedUserId = this.usersService.deleteUser(userId);
      res.status(200).json(deletedUserId);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}
