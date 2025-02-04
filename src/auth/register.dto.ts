import { z } from 'zod';

export const signUpDto = z.object({
  name: z.string().min(2, { message: 'Name Atleast Contain min 2 char ' }),
  email: z.string().email({ message: 'Name Atleast Contain min 2 char ' }),
  password: z
    .string()
    .min(6, { message: 'Password Atleast Contain min 3 char ' }),
});
