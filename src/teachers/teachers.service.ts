import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TeachersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const allTeachers = await this.prismaService.teacher.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        created: 'desc',
      },
    });
    return allTeachers;
  }

  async findOne(id: number) {
    const teacher = await this.prismaService.teacher.findFirst({
      where: {
        id: id,
      },
    });

    if (teacher?.name) return teacher;

    throw new HttpException('Esse professor não existe!', HttpStatus.NOT_FOUND);
  }

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const newTeacher = await this.prismaService.teacher.create({
        data: {
          name: createTeacherDto.name,
        },
      });

      return newTeacher;
    } catch (e) {
      throw new HttpException(
        'Não foi possível cadastrar o professor!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      const findTeacher = await this.prismaService.teacher.findFirst({
        where: {
          id: id,
        },
      });

      if (!findTeacher)
        throw new HttpException(
          'Esse professor não existe!',
          HttpStatus.NOT_FOUND,
        );

      const teacher = await this.prismaService.teacher.update({
        where: {
          id: findTeacher.id,
        },
        data: updateTeacherDto,
      });

      return teacher;
    } catch (e) {
      throw new HttpException(
        'Não foi possível atualizar o professor!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number) {
    try {
      const findTeacher = await this.prismaService.teacher.findFirst({
        where: {
          id: id,
        },
      });

      if (!findTeacher) {
        throw new HttpException(
          'Esse professor não existe!',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prismaService.teacher.delete({
        where: {
          id: findTeacher.id,
        },
      });

      return 'Professor excluído com sucesso!';
    } catch (e) {
      throw new HttpException(
        'Não foi possível deletar o usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
