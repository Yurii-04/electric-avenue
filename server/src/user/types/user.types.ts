import { Users } from '@prisma/client';
import { JwtPayload } from '~/auth/types';

export type UserWithExcludeFields = Omit<Users, 'hashedPassword' | 'hashedRt'>;

interface User extends JwtPayload {
  iat: string;
  exp: string;
}

export interface RequestWithUser extends Request {
  user?: User;
}
