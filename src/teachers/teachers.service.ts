import { Injectable } from '@nestjs/common';

@Injectable()
export class TeachersService {
  findAllTeachers() {
    return [
      {
        id: 1,
        teacher: 'José',
      },
      {
        id: 2,
        teacher: 'João',
      },
      {
        id: 3,
        teacher: 'Maria',
      },
    ];
  }

  findOneTeachers() {
    return 'Retornando um único professor';
  }
}
