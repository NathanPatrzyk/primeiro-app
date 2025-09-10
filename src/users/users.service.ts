import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAllUsers() {
    return [
      {
        id: 1,
        user: 'José',
      },
      {
        id: 2,
        user: 'João',
      },
      {
        id: 3,
        user: 'Maria',
      },
    ];
  }

  findOneUsers() {
    return 'Retornando um único usuário';
  }
}
