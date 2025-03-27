import { Controller } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { MessagePattern } from '@nestjs/microservices';
import { ChangeStatusDto, CreateIdeaDto } from '@conidea/model';

@Controller()
export class IdeasController {
  constructor(private readonly userService: IdeasService) {}

  @MessagePattern({ cmd: 'get_all_ideas' })
  async getAllIdeas() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'create_idea' })
  async createIdea(createIdeaDto: CreateIdeaDto) {
    return this.userService.create(createIdeaDto);
  }

  @MessagePattern({ cmd: 'update_status' })
  async updateStatus(changeStatusDto: ChangeStatusDto) {
    return this.userService.updateStatus(changeStatusDto);
  }
}
