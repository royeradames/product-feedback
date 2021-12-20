import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDocumentation(): string {
    return '<h1>Welcome to the feedback-app API</h1> <p><a href="https://documenter.getpostman.com/view/11996006/UVRBkki5" target="_blank">Go to the documentation</a></p>';
  }
}
