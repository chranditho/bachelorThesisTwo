import { Module } from '@nestjs/common';
import { IdeasController } from './ideas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Idea, IdeaSchema } from './schemas/idea.schema';
import { StatusTransitionValidatorService } from './status-transition-validator.service';
import { IdeasService } from './ideas.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]),
  ],
  controllers: [IdeasController],
  providers: [IdeasService, StatusTransitionValidatorService],
})
export class IdeasModule {}
