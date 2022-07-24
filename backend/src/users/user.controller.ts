import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { response } from 'express';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Res() response, @Body() user: User) {
    const newUser = await this.userService.create(user);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @Get('')
  async fetchAll(@Res() response) {
    let users = await this.userService.findAll();

    const totalUsers = users.length;

    const message = 'users fetched';

    return response.status(HttpStatus.OK).json({ message, users, totalUsers });
  }

  @Get(':email')
  async fetchUser(@Res() response, @Param('email') email: string) {
    let users = await this.userService.findUserByEmail(email);
  }
}
