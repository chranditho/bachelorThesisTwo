import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { Idea } from './schemas/idea.schema';
import {
  ChangeStatusDto,
  CreateCommentDto,
  CreateIdeaDto,
} from '@conidea/model';

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Get()
  findAll(): Promise<Idea[]> {
    Logger.log('Getting all ideas', IdeasController.name);
    return this.ideasService.findAll();
  }

  @Post('new')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createIdeaDto: CreateIdeaDto
  ): Promise<{ message: string }> {
    try {
      Logger.log(
        `Creating new Idea: ${createIdeaDto.title} ${createIdeaDto.description}`,
        IdeasController.name
      );

      await this.ideasService.create(createIdeaDto);

      const successMessage = 'Idea created successfully!';
      Logger.warn(successMessage, IdeasController.name);

      return { message: successMessage };
    } catch (error) {
      Logger.error(
        `Error creating new idea: ${error.message || 'Invalid idea'}`,
        IdeasController.name
      );

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Bad Request: Invalid Idea',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        }
      );
    }
  }

  @Patch('update')
  async updateStatus(@Body() changeStatusDto: ChangeStatusDto): Promise<Idea> {
    return this.ideasService.updateStatus(changeStatusDto);
  }

  @Post('comment')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addComment(@Body() createCommentDto: CreateCommentDto): Promise<Idea> {
    return this.ideasService.addComment(createCommentDto);
  }
}
