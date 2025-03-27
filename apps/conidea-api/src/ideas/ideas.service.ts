import { Injectable } from '@nestjs/common';
import {
  ChangeStatusDto,
  CreateCommentDto,
  CreateIdeaDto,
  Idea,
} from '@conidea/model';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IdeasService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'ideas_queue',
        queueOptions: { durable: false },
      },
    });
  }

  async findAll(): Promise<Idea[]> {
    return firstValueFrom(this.client.send({ cmd: 'get_all_ideas' }, {}));
  }

  async create(createIdeaDto: CreateIdeaDto): Promise<void> {
    return firstValueFrom(
      this.client.send({ cmd: 'create_idea' }, createIdeaDto),
    );
  }

  async updateStatus(changeStatusDto: ChangeStatusDto): Promise<Idea> {
    return firstValueFrom(
      this.client.send({ cmd: 'update_status' }, changeStatusDto),
    );
  }

  async addComment(createCommentDto: CreateCommentDto): Promise<Idea> {
    return firstValueFrom(
      this.client.send({ cmd: 'add_comment' }, createCommentDto),
    );
  }
}
