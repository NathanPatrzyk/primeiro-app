import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const allTasks = await this.prismaService.task.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        created: 'desc',
      },
    });
    return allTasks;
  }

  async findOne(id: number) {
    const task = await this.prismaService.task.findFirst({
      where: {
        id: id,
      },
    });

    if (task?.name) return task;

    throw new HttpException('Essa Tarefa Não Existe!', HttpStatus.NOT_FOUND);
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = await this.prismaService.task.create({
        data: {
          name: createTaskDto.name,
          description: createTaskDto.description,
          completed: false,
        },
      });

      return newTask;
    } catch (e) {
      throw new HttpException(
        'Não foi possível cadastrar a tarefa!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const findTask = await this.prismaService.task.findFirst({
        where: {
          id: id,
        },
      });

      if (!findTask)
        throw new HttpException(
          'Essa tarefa não existe!',
          HttpStatus.NOT_FOUND,
        );

      const task = await this.prismaService.task.update({
        where: {
          id: findTask.id,
        },
        data: updateTaskDto,
      });

      return task;
    } catch (e) {
      throw new HttpException(
        'Não foi possível atualizar a tarefa!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number) {
    try {
      const findTask = await this.prismaService.task.findFirst({
        where: {
          id: id,
        },
      });

      if (!findTask)
        throw new HttpException(
          'Essa tarefa não existe!',
          HttpStatus.NOT_FOUND,
        );

      await this.prismaService.task.delete({
        where: {
          id: findTask.id,
        },
      });

      return 'Tarefa excluída com sucesso!';
    } catch (e) {
      throw new HttpException(
        'Não foi possível deletar a tarefa!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
