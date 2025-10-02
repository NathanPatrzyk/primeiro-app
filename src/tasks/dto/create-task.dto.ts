/**
 * DTO (Data Transfer Object) - Objeto de Transferência de Dados
 * Objetivo: Validar dados, transformar.
 * É utilizado para representar quais dados e em que formatos uma determinada camada aceita e trabalha.
 */

import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'O nome precisa ser um texto!' })
  @MinLength(5, { message: 'O nome precisa ter pelo menos 5 caracteres!' })
  @MaxLength(10, { message: 'O nome precisa ter no máximo 10 caracteres!' })
  readonly name: string;

  @IsString({ message: 'A descrição precisa ser um texto!' })
  @MinLength(10, {
    message: 'A descrição precisa ter pelo menos 10 caracteres!',
  })
  @IsNotEmpty({ message: 'A descrição não pode ser vazia!' })
  readonly description: string;
}
