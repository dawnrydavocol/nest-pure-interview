import { z } from 'zod';

export const CreateAgentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  mobileNumber: z.string(),
});

export type CreateAgentDto = z.infer<typeof CreateAgentSchema>;
