import { Module } from '@nestjs/common';
import { IdeasController } from './ideas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusTransitionValidatorService } from './status-transition-validator.service';
import { IdeasService } from './ideas.service';
import { Idea, IdeaSchema } from './ideas.schema';
import { User, UserSchema } from '../../../users-api/src/app/user.schema';
import { DraftsController } from '../drafts/drafts.controller';
import { DraftsService } from '../drafts/drafts.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/conidea'),
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [IdeasController, DraftsController],
  providers: [IdeasService, StatusTransitionValidatorService, DraftsService],
})
export class IdeasModule {}
