import { Users } from '@prisma/client';

export type UserWithExcludeFields = Omit<Users, 'hashedPassword' | 'hashedRt'>;
