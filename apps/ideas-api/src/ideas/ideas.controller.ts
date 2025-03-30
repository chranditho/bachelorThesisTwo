import { Controller } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  ChangeStatusDto,
  CreateCommentDto,
  CreateDraftDto,
  CreateIdeaDto,
} from '@conidea/model';

@Controller()
export class IdeasController {
  constructor(private readonly userService: IdeasService) {}

  @MessagePattern({ cmd: 'get_all_ideas' })
  async getAllIdeas() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'create_idea' })
  async createIdea(createIdeaDto: CreateIdeaDto) {
    console.log('Creating new Idea:', createIdeaDto);
    await this.userService.create(createIdeaDto);
    return { success: true };
  }

  @MessagePattern({ cmd: 'update_status' })
  async updateStatus(changeStatusDto: ChangeStatusDto) {
    return this.userService.updateStatus(changeStatusDto);
  }

  @MessagePattern({ cmd: 'add_comment' })
  async addComment(createCommentDto: CreateCommentDto) {
    return this.userService.addComment(createCommentDto);
  }

  @MessagePattern({ cmd: 'submit_draft' })
  async submitDraft(createDraftDto: CreateDraftDto) {
    return this.userService.submitDraft(createDraftDto);
  }
}
