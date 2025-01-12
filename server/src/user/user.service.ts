import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';
import { HashingService } from '~/hashing/hashing.service';
import { AuthDto } from '~/auth/dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async save(dto: AuthDto): Promise<Users> {
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

  findAll(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }
}
