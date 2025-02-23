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
import { DraftsService } from './drafts.service';
import { CreateDraftDto, UpdateDraftDto } from '@conidea/model';
import { Draft } from './schemas/draft.schema';

@Controller('drafts')
export class DraftsController {
  constructor(private readonly draftsService: DraftsService) {}

  @Post()
  async create(@Body() createDraftDto: CreateDraftDto) {
    try {
      Logger.log(
        `Creating new Draft:  ${createDraftDto.title} ${createDraftDto.description}`,
        DraftsController.name
      );
      await this.draftsService.create(createDraftDto);

      const successMessage = 'Draft created successfully!';
      Logger.log(successMessage, DraftsController.name);

      return { message: successMessage };
    } catch (error) {
      Logger.error(
        `Error creating new draft: ${error.message}`,
        DraftsController.name
      );
    }
  }

  @Get()
  findAll(): Promise<Draft[]> {
    return this.draftsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.draftsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDraftDto: UpdateDraftDto) {
    return this.draftsService.update(id, updateDraftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.draftsService.remove(id);
  }
}
