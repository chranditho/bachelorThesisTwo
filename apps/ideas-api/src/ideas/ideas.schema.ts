import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Author, Status } from '@conidea/model';

@Schema()
export class Idea {
  @Prop({ required: false })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Object })
  author: Author;

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
