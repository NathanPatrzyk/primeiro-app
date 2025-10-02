import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsBoolean({ message: 'O status de completo precisa ser um booleano!' })
  @IsOptional()
  readonly completed?: boolean;
}
