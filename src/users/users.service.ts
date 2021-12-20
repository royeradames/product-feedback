import { Injectable } from '@nestjs/common';
import db from '../db/dbConfig';

export type User = {
  image: string;
  name: string;
  username: string;
};

@Injectable()
export class UsersService {
  async getCurrentUser() {
}
