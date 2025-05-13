import { Module } from '@nestjs/common';
import { IdeasController } from './ideas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusTransitionValidatorService } from './status-transition-validator.service';
import { IdeasService } from './ideas.service';
import { Idea, IdeaSchema } from './ideas.schema';
import { DraftsController } from '../drafts/drafts.controller';
import { DraftsService } from '../drafts/drafts.service';
import { environment } from '../environments/environment';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongodb.uri),
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [IdeasController, DraftsController],
  providers: [IdeasService, StatusTransitionValidatorService, DraftsService],
})
export class IdeasModule {}
