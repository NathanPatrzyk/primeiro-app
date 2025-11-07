import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { ApiExceptionFilter } from 'src/common/filters/exception.filter';

@Module({
  imports: [PrismaModule],
  controllers: [TeachersController],
  providers: [
    TeachersService,
    { provide: APP_FILTER, useClass: ApiExceptionFilter },
  ],
})
export class TeachersModule {}
