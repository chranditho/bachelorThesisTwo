import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserRole } from '@conidea/model';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [environment.rabbitmq.url],
        queue: environment.rabbitmq.users_queue,
        queueOptions: { durable: false },
      },
    });
  }

  async findAll() {
    return firstValueFrom(this.client.send({ cmd: 'get_all_users' }, {}));
  }

  async getLoggedIn() {
    return firstValueFrom(this.client.send({ cmd: 'get_loggedIn' }, {}));
  }

  async logIn(id: string) {
    return firstValueFrom(this.client.send({ cmd: 'log_in' }, { id }));
  }

  async switchUserRole(id: string, role: UserRole) {
    return firstValueFrom(
      this.client.send({ cmd: 'switch_role' }, { id, role }),
    );
  }
}
