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
      select: {
        id: true,
        name: true,
        email: true,
        task: true,
      },
    });
    return allUsers;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (user) return user;

    throw new HttpException('Usuário não encontrado!', HttpStatus.BAD_REQUEST);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.prismaService.user.create({
        data: {
          name: createUserDto.name,
          passwordHash: createUserDto.password,
          email: createUserDto.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return newUser;
    } catch (e) {
      throw new HttpException(
        'Esse usuário não foi criado!',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!user)
        throw new HttpException(
          'Esse usuário não existe!',
          HttpStatus.BAD_REQUEST,
        );

      const updateUser = await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: updateUserDto.name ? updateUserDto.name : user.name,
          passwordHash: updateUserDto.password
            ? updateUserDto.password
            : user.passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return updateUser;
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
