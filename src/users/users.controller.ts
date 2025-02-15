import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUsersDto) {
    return this.usersService.createUsers(dto);
  }

  @Get()
  async getUsers(@Req() req: any) {
    const userId = req.user["id"]
    return this.usersService.getUsers(userId);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUsersById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUsersDto) {
    return this.usersService.updateUsers(id, dto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUsers(id);
  }
}