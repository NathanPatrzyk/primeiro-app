/**
 * DTO (Data Transfer Object) - Objeto de Transferência de Dados
 * Objetivo: Validar dados, transformar.
 * É utilizado para representar quais dados e em que formatos uma determinada camada aceita e trabalha.
 */

export class CreateTaskDto {
  readonly name: string;
  readonly description: string;
}
