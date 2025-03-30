import { Injectable } from '@nestjs/common';
import { CreateDraftDto, UpdateDraftDto } from '@conidea/model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Draft } from './schemas/draft.schema';

@Injectable()
export class DraftsService {
  constructor(@InjectModel(Draft.name) private draftModel: Model<Draft>) {}

  async create(createDraftDto: CreateDraftDto) {
    await this.draftModel.create(createDraftDto);
  }

  findAll(): Promise<Draft[]> {
    return this.draftModel.find();
  }

  update(id: string, updateDraftDto: UpdateDraftDto) {
    return this.draftModel.findByIdAndUpdate(id, updateDraftDto).exec();
  }

  remove(id: string) {
    return this.draftModel.findByIdAndDelete(id).exec();
  }
}
