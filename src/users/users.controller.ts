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
}
