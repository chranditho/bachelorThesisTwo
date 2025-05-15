import { Module } from '@nestjs/common';

import { IdeasModule } from './ideas/ideas.module';
import { UsersModule } from './users/users.module';
import { DraftsModule } from './drafts/drafts.module';

@Module({
  imports: [IdeasModule, UsersModule, DraftsModule],
})
export class AppModule {}
