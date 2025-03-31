import { Controller, Logger } from '@nestjs/common';
import { DraftsService } from './drafts.service';
import { CreateIdeaDto, DraftDto, UpdateDraftDto } from '@conidea/model';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class DraftsController {
  constructor(private readonly draftsService: DraftsService) {}

  @MessagePattern({ cmd: 'create_draft' })
  async create(@Payload() createIdeaDto: CreateIdeaDto) {
    Logger.log(
      `Creating new Draft: ${createIdeaDto.title} ${createIdeaDto.description}`,
      DraftsController.name,
    );
    await this.draftsService.create(createIdeaDto);
    return { message: 'Draft created successfully!' };
  }

  @MessagePattern({ cmd: 'update_draft' })
  async update(@Payload() payload: { id: string; dto: UpdateDraftDto }) {
    return this.draftsService.update(payload.id, payload.dto);
  }

  @MessagePattern({ cmd: 'get_all_drafts' })
  findAll(): Promise<DraftDto[]> {
    return this.draftsService.findAll();
  }

  @MessagePattern({ cmd: 'delete_draft' })
  remove(@Payload() payload: { id: string }) {
    return this.draftsService.remove(payload.id);
  }
}
