import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome precisa ser um texto!' })
  @MinLength(5, { message: 'O nome precisa ter pelo menos 5 caracteres!' })
  @MaxLength(10, { message: 'O nome precisa ter no máximo 10 caracteres!' })
  readonly name: string;
}
