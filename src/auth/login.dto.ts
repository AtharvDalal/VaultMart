import { z } from 'zod';

export const loginUserDto = z.object({
  email: z.string().email({ message: 'Name nedd 3 char' }),
  password: z.string().min(6, { message: 'password nedd 3 char' }),
});
