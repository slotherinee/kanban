import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:username')
  async findOne(@Param('username') username: string) {
    return await this.userService.findOne(username);
  }

  @Post()
  async create(@Body() userData: CreateUserDto) {
    return await this.userService.create(userData);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return await this.userService.update(id, userData);
  }
}
