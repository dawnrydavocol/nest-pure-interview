import { z } from 'zod';

export const UpdateAgentSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  mobileNumber: z.string(),
});

export type UpdateAgentDto = z.infer<typeof UpdateAgentSchema>;
