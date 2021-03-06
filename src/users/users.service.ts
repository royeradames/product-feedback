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
  async getUserById(userId: number) {
    try {
      const user = await db('users').where({ userId }).first();
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw error(error);
    }
  }
  async createUser(user: User) {
    try {
      const newUserId = await db('users').insert(user);
      return newUserId;
    } catch (error) {
      throw error(error);
    }
  }

  async deleteUser(userId: number) {
    try {
      const deletedUserId = await db('users').where({ userId }).del();
      return deletedUserId;
    } catch (error) {
      throw error(error);
    }
  }
}
