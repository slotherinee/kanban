import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return await this.prisma.user.create({ data });
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async findOne(username: string, omitPassword = true) {
    return await this.prisma.user.findFirst({
      where: { username },
      omit: { password: omitPassword },
    });
  }

  async findById(id: string, omitPassword = true) {
    return await this.prisma.user.findUnique({
      where: { id },
      omit: { password: omitPassword },
    });
  }
}
