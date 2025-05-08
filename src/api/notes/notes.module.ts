import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { AllInOneRepository } from '../../repository/agent/index';

@Module({
  controllers: [NotesController],
  providers: [NotesService, AllInOneRepository],
})
export class NotesModule {}
