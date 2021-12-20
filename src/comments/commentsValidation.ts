import { IsNotEmpty, IsString, IsInt, IsNumberString } from 'class-validator';

export default class CommentsValidation {
  @IsNumberString()
  commentsId: number;
  @IsInt()
  productRequestsId: number;

  @IsString()
  content: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  replyingTo: string;
}
