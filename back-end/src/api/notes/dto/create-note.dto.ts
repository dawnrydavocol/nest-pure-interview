import { z } from 'zod';

export const CreateNoteSchema = z.object({
  agentID: z.string(), // Foreign Key → PropertyAgent.id
  propertyId: z.string(), // Foreign Key → Property.id
  content: z.string(),
});

export type CreateNoteDto = z.infer<typeof CreateNoteSchema>;
