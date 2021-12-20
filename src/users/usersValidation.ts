import { IsNumberString, IsString } from 'class-validator';

export default class usersValidation {
  @IsNumberString()
  userId: number;
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  username: string;
}
