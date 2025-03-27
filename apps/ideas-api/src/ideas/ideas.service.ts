import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ChangeStatusDto,
  CreateCommentDto,
  CreateDraftDto,
  CreateIdeaDto,
} from '@conidea/model';
import { StatusTransitionValidatorService } from './status-transition-validator.service';
import { Idea } from './ideas.schema';

@Injectable()
export class IdeasService {
  constructor(@InjectModel(Idea.name) private ideaModel: Model<Idea>) {}

  async findAll(): Promise<Idea[]> {
    return this.ideaModel.find().populate('author').exec();
  }

  async create(createIdeaDto: CreateIdeaDto): Promise<void> {
    try {
      await this.ideaModel.create({
        ...createIdeaDto,
        author: createIdeaDto.userId,
      });
    } catch (error) {
      Logger.error(error, IdeasService.name);
    }
  }

  async updateStatus(changeStatusDto: ChangeStatusDto) {
    await this.checkForValidTransition(changeStatusDto);

    return this.ideaModel
      .findByIdAndUpdate(
        changeStatusDto.ideaId,
        { status: changeStatusDto.status },
        { new: true },
      )
      .populate('author')
      .exec();
  }

  async checkForValidTransition(changeStatusDto: ChangeStatusDto) {
    const idea = await this.getIdea(changeStatusDto.ideaId);

    const validTransition =
      StatusTransitionValidatorService.checkStatusTransitionValidity(
        idea.status,
        changeStatusDto.status as never,
      );
    if (!validTransition) {
      throw new BadRequestException(
        `Invalid status transition from ${idea.status} to ${changeStatusDto.status}`,
      );
    }
  }

  async addComment(createCommentDto: CreateCommentDto) {
    await this.ideaModel.updateOne(
      { _id: createCommentDto.ideaId },
      { $push: { comments: createCommentDto.comment } },
    );

    return this.ideaModel.findById(createCommentDto.ideaId).populate('author');
  }

  async submitDraft(createDraftDto: CreateDraftDto) {
    return await this.createFromDraft(createDraftDto);
  }

  private async getIdea(id: string) {
    return this.ideaModel.findById(id).orFail(() => {
      throw new NotFoundException('Idea not found');
    });
  }

  private async createFromDraft(createDraftDto: CreateDraftDto) {
    try {
      const ideaModel = await this.ideaModel.create({
        ...createDraftDto,
        author: createDraftDto.userId,
      });
      return ideaModel.populate('author');
    } catch (error) {
      Logger.error(error, IdeasService.name);
    }
  }
}
