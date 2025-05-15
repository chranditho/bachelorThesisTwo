import { Module } from '@nestjs/common';
import { DraftsController } from './drafts.controller';

@Module({
  imports: [],
  controllers: [DraftsController],
})
export class DraftsModule {}
