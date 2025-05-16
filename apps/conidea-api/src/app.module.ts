import { Module } from '@nestjs/common';

import { IdeasModule } from './ideas/ideas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { DraftsModule } from './drafts/drafts.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/conidea',
    ),
    IdeasModule,
    UsersModule,
    DraftsModule,
  ],
})
export class AppModule {}
