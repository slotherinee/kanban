import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username, false);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      void password;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async me(user: User) {
    return await this.userService.findById(user.id);
  }

  async register(user: CreateUserDto) {
    const existingUser = await this.userService.findOne(user.username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userService.create({
      ...user,
      password: hashedPassword,
    });

    const payload = { username: newUser.username, id: newUser.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
