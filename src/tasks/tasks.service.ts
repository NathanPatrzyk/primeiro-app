import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Nome da Tarefa',
      description: 'Descrição da Tarefa',
      completed: false,
    },
  ];

  findAll() {
    return this.tasks;
  }

  find(id: string) {
    const task = this.tasks.find((task) => task.id === Number(id));

    if (task) return task;

    throw new HttpException('Essa Tarefa Não Existe!', HttpStatus.NOT_FOUND);
  }

  create(body: any) {
    const newId = this.tasks.length + 1;

    const newTask = {
      id: newId,
      ...body,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  update(id: string, body: any) {
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));

    if (taskIndex < 0) {
      throw new HttpException('Essa Tarefa Não Existe!', HttpStatus.NOT_FOUND);
    }

    const taskItem = this.tasks[taskIndex];

    this.tasks[taskIndex] = {
      ...taskItem,
      ...body,
    };

    return this.tasks[taskIndex];
  }

  delete(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));

    if (taskIndex < 0) {
      throw new HttpException('Essa Tarefa Não Existe!', HttpStatus.NOT_FOUND);
    }

    this.tasks.splice(taskIndex, 1);

    return 'Tarefa Excluída com Sucesso!';
  }
}
