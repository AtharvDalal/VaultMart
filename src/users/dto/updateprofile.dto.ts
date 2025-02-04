import { z } from 'zod';

export const updateProfileDto = z.object({
  name: z.string().min(2, { message: 'Min name char should be 2' }),

  surname: z.string().min(2, { message: 'Min surname char should be 2' }),

  phone: z.number().min(10, { message: 'Min Phone number is at least 10' }),
});
