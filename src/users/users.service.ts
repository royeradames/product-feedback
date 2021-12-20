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
    // return the first user
    try {
      const currentUser = await db('users').where({ userId: 1 }).first();
      if (!currentUser) throw new Error('User not found');
      return currentUser;
    } catch (error) {
      throw error(error);
    }
  }
}
