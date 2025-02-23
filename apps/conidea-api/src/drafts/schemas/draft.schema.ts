import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Draft {
  @Prop({ required: false })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: false, type: Date, default: Date.now })
  createdAt: Date;
}

export const DraftSchema = SchemaFactory.createForClass(Draft);
