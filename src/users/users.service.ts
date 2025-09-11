import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Nome do Usuário',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === Number(id));

    if (user) return user;

    throw new HttpException('Esse Usuário Não Existe', HttpStatus.NOT_FOUND);
  }

  create(createUserDto: CreateUserDto) {
    const newId = this.users.length + 1;

    const newUser = {
      id: newId,
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === Number(id));

    if (userIndex < 0) {
      throw new HttpException('Esse Usuário Não Existe', HttpStatus.NOT_FOUND);
    }

    const userItem = this.users[userIndex];

    this.users[userIndex] = {
      ...userItem,
      ...updateUserDto,
    };

    return this.users[userIndex];
  }

  delete(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === Number(id));

    if (userIndex < 0) {
      throw new HttpException('Esse Usuário Não Existe!', HttpStatus.NOT_FOUND);
    }

    this.users.splice(userIndex, 1);

    return 'Usuário Excluído com Sucesso!';
  }
}
