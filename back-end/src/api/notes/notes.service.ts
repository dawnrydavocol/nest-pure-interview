import { Injectable } from '@nestjs/common';
import { Note } from '../../models/agent/Note';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteSchema } from './dto/update-note.dto';
import { AllInOneRepository } from '../../repository/agent/index';

@Injectable()
export class NotesService {
  constructor(private readonly repository: AllInOneRepository) {}

  create(createNoteDto: CreateNoteDto): Note {
    const newNote: Note = {
      id: (this.repository.Note.findAll().length + 1).toString(),
      agentID: createNoteDto.agentID,
      propertyId: createNoteDto.propertyId,
      content: createNoteDto.content,
      createdAt: new Date(),
    };
    this.repository.Note.create(newNote);
    return newNote;
  }

  update(id: number, updateNoteDto: UpdateNoteSchema): Note {
    const existingNote = this.repository.Note.findById(id.toString());
    const existingAgent = this.repository.PropertyAgent.findById(updateNoteDto.agentID);

    if (!existingAgent) {
      throw new Error('Agent not found');
    }

    if (!existingNote) {
      throw new Error('Note not found');
    }
    const updatedNote = { ...existingNote, ...updateNoteDto };
    this.repository.Note.update(id.toString(), updatedNote);
    return updatedNote as Note;
  }

  delete(id: number): void {
    const existingNote = this.repository.Note.findById(id.toString());
    if (!existingNote) {
      throw new Error('Note not found');
    }
    this.repository.Note.delete(id.toString());
  }

  findAll(): Note[] {
    return this.repository.Note.findAll();
  }

  findById(id: number): Note {
    const note = this.repository.Note.findById(id.toString());
    if (!note) {
      throw new Error('Note not found');
    }
    return note;
  }
}
