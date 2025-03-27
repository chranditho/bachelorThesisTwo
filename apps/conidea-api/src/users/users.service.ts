import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'users_queue',
        queueOptions: { durable: false },
      },
    });
  }

  async findAll() {
    return firstValueFrom(this.client.send({ cmd: 'get_all_users' }, {}));
  }
}
