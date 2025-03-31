import { Injectable } from '@nestjs/common';
import {
  CreateIdeaDto,
  DraftDto,
  Status,
  UpdateDraftDto,
} from '@conidea/model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Idea } from '../ideas/ideas.schema';

@Injectable()
export class DraftsService {
  constructor(@InjectModel(Idea.name) private ideaModel: Model<Idea>) {}

  async create(createIdeaDto: CreateIdeaDto) {
    await this.ideaModel.create({ ...createIdeaDto, status: Status.Draft });
  }

  async findAll(): Promise<DraftDto[]> {
    const drafts = await this.ideaModel.find({ status: Status.Draft });
    return drafts.map((draft) => {
      const dto: DraftDto = {
        _id: draft.id,
        title: draft.title,
        description: draft.description,
        author: {
          userId: draft.author.id,
          name: draft.author.name,
        },
        createdAt: draft.createdAt,
      };
      return dto;
    });
  }

  update(id: string, updateDraftDto: UpdateDraftDto) {
    return this.ideaModel.findByIdAndUpdate(id, updateDraftDto).exec();
  }

  remove(id: string) {
    return this.ideaModel.findByIdAndDelete(id).exec();
  }
}
