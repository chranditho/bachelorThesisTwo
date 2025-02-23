import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '@conidea/model';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: false })
  lastname: string;

  @Prop({
    required: true,
    enum: UserRole,
    type: String,
    default: UserRole.User,
  })
  role: UserRole;

  @Prop({ required: true })
  isLoggedIn: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
