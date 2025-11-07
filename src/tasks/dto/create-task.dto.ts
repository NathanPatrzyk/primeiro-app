/**
 * DTO (Data Transfer Object) - Objeto de Transferência de Dados
 * Objetivo: Validar dados, transformar.
 * É utilizado para representar quais dados e em que formatos uma determinada camada aceita e trabalha.
 */

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'O nome precisa ser um texto!' })
  @MinLength(5, { message: 'O nome precisa ter pelo menos 5 caracteres!' })
  @MaxLength(20, { message: 'O nome precisa ter no máximo 20 caracteres!' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  readonly name: string;

  @IsString({ message: 'A descrição precisa ser um texto!' })
  @IsNotEmpty({ message: 'A descrição não pode ser vazia!' })
  @MaxLength(100, {
    message: 'A descrição não pode ser maior do que 100 caracteres!',
  })
  @IsNotEmpty({ message: 'A descrição não pode ser vazia!' })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}
