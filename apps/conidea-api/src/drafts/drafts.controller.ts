import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDraftDto, CreateIdeaDto, UpdateDraftDto } from '@conidea/model';
import { Draft } from './schemas/draft.schema';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('drafts')
export class DraftsController {
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

  @Post()
  async create(@Body() createIdeaDto: CreateIdeaDto) {
    Logger.log(
      `Creating new Draft:  ${createIdeaDto.title} ${createIdeaDto.description}`,
      DraftsController.name,
    );
    return firstValueFrom(
      this.client.send({ cmd: 'create_draft' }, createIdeaDto),
    );
  }

  @Get()
  findAll(): Promise<Draft[]> {
    return firstValueFrom(this.client.send({ cmd: 'get_all_drafts' }, {}));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDraftDto: UpdateDraftDto) {
    return firstValueFrom(
      this.client.send({ cmd: 'update_draft' }, { id, updateDraftDto }),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete_draft' }, { id });
  }
}
