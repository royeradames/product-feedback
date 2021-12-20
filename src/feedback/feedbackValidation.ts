import { IsIn, IsString, IsNumberString } from 'class-validator';

export default class FeedbackValitation {
  @IsNumberString()
  productRequestsId: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsIn(['enhancement', 'feature', 'bug', 'UI', 'UX'])
  category: string;

  @IsString()
  @IsIn(['suggestion', 'planned', 'in-progress', 'live'])
  status: string;
}
