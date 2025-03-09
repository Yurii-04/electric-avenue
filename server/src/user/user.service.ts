import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';
import { HashingService } from '~/hashing/hashing.service';
import { RegisterDto } from '~/auth/dto';
import { UserWithExcludeFields } from '~/user/types';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async save(dto: RegisterDto): Promise<Users> {
    const hashedPassword = await this.hashingService.hash(dto.password, 10);
    return this.prisma.users.create({
      data: {
        email: dto.email,
        hashedPassword: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });
  }

  findByEmail(email: string): Promise<Users> {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  findById(id: string): Promise<Users> {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  findAll(): Promise<UserWithExcludeFields[]> {
    return this.prisma.users.findMany({
      omit: {
        hashedPassword: true,
        hashedRt: true,
      },
    });
  }

  getMe(id: string): Promise<UserWithExcludeFields> {
    return this.prisma.users.findUnique({
      omit: {
        hashedPassword: true,
        hashedRt: true,
      },
      where: {
        id,
      },
    });
  }
}
