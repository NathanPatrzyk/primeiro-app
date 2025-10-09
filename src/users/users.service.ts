import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const allUsers = await this.prismaService.user.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        created: 'desc',
      },
    });
    return allUsers;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });

    if (user?.name) return user;

    throw new HttpException('Esse usuário não existe!', HttpStatus.NOT_FOUND);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.prismaService.user.create({
        data: {
          name: createUserDto.name,
        },
      });

      return newUser;
    } catch (e) {
      throw new HttpException(
        'Não foi possível cadastrar o usuário!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const findUser = await this.prismaService.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!findUser)
        throw new HttpException(
          'Esse usuário não existe!',
          HttpStatus.NOT_FOUND,
        );

      const user = await this.prismaService.user.update({
        where: {
          id: findUser.id,
        },
        data: updateUserDto,
      });

      return user;
    } catch (e) {
      throw new HttpException(
        'Não foi possível atualizar o usuário!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number) {
    try {
      const findUser = await this.prismaService.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!findUser)
        throw new HttpException(
          'Esse usuário não existe',
          HttpStatus.NOT_FOUND,
        );

      await this.prismaService.user.delete({
        where: {
          id: findUser.id,
        },
      });

      return 'Usuário excluido com sucesso!';
    } catch (e) {
      throw new HttpException(
        'Não foi possível deletar o usuário!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
