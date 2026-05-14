import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export type { User } from '@prisma/client';
export { Role } from '@prisma/client';

export class UserEntity implements User {
  id!: number;
  email!: string;
  name!: string;

  @Exclude()
  password!: string;

  role!: Role;

  createdAt!: Date;
  updatedAt!: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
