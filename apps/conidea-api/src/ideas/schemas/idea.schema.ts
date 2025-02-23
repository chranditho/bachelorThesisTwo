import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from '@conidea/model';
import { Types } from 'mongoose';

@Schema()
export class Idea {
  @Prop({ required: false })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;

  @Prop({ required: false, type: Date, default: Date.now })
  createdAt: Date;

  @Prop({
    required: true,
    enum: Status,
    type: String,
    default: Status.Submitted,
  })
  status: Status;

  @Prop({ type: [String], default: [] })
  comments: string[];
}

export const IdeaSchema = SchemaFactory.createForClass(Idea);
