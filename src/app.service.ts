import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'VIBRANT CREATOR api version 1.0';
  }
}
