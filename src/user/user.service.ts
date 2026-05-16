import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { Role, User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './DTO/update-user.dto';

const salt_Rounds = 10;

@Injectable()
export class UserService {
  constructor(private readonly datasService: DatabaseService) {}

  // Create a new user
  async create(createUser: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUser.password, salt_Rounds);
    return this.datasService.user.create({
      data: {
        name: createUser.name,
        email: createUser.email,
        password: hashedPassword,
        role: (createUser.role?.toUpperCase() as Role) ?? 'USER',
      },
    });
  }

  // Find all users
  async findAll(role?: string): Promise<User[]> {
    if (role) {
      return this.datasService.user.findMany({
        where: {
          role: role.toUpperCase() as Role,
        },
      });
    }
    return this.datasService.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.datasService.user.findUnique({
      where: {
        id,
      },
    });
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return await this.datasService.user.findUnique({
      where: {
        email,
      },
    });
  }

  // Update user
  async update(id: number, udpedateUser: UpdateUserDto): Promise<User> {
    let hashepPassWord: string | undefined;
    if (udpedateUser.password) {
      hashepPassWord = await bcrypt.hash(udpedateUser.password, salt_Rounds);
    }
    return await this.datasService.user.update({
      where: {
        id,
      },
      data: {
        ...udpedateUser,
        password: hashepPassWord ?? undefined,
        role: udpedateUser.role
          ? (udpedateUser.role.toUpperCase() as Role)
          : undefined,
      },
    });
  }

  remove(id: number): Promise<User> {
    return this.datasService.user.delete({
      where: { id },
    });
  }

  async verifyPassword(
    plainPassword: string,
    hahedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hahedPassword);
  }
}
