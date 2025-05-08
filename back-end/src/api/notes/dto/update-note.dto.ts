import { z } from 'zod';

export const UpdateNoteDto = z.object({
  id: z.string(), // Primary Key
  agentID: z.string(), // Foreign Key → PropertyAgent.id
  propertyId: z.string().optional(), // Foreign Key → Property.id
  content: z.string().optional(),
});

export type UpdateNoteSchema = z.infer<typeof UpdateNoteDto>;
