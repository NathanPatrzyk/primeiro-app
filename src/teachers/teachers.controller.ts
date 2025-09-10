import { Controller, Get } from '@nestjs/common';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  findAllTasks() {
    return this.teachersService.findAllTeachers();
  }

  @Get(':id')
  findOneTasks() {
    return this.teachersService.findOneTeachers();
  }
}
