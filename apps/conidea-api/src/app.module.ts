import { Module } from '@nestjs/common';

import { IdeasModule } from './ideas/ideas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { DraftsModule } from './drafts/drafts.module';
import { environment } from './environments/environment';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongodb.uri),
    IdeasModule,
    UsersModule,
    DraftsModule,
  ],
})
export class AppModule {}
