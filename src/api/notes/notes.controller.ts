import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto, CreateNoteSchema } from './dto/create-note.dto';
import { UpdateNoteDto, UpdateNoteSchema } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  createNote(@Body() createNoteDto: CreateNoteDto) {
    CreateNoteSchema.parse(createNoteDto);
    return this.notesService.create(createNoteDto);
  }

  @Get()
  getNotes() {
    return this.notesService.findAll();
  }

  @Get(':id')
  getNoteById(@Param('id') id: string) {
    return this.notesService.findById(+id);
  }

  @Put(':id')
  updateNote(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteSchema) {
    UpdateNoteDto.parse(UpdateNoteDto);
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string) {
    return this.notesService.delete(+id);
  }
}
