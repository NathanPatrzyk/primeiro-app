import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAllTasks() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOneTasks() {
    return this.usersService.findOneUsers();
  }
}
