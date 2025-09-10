import { Injectable } from '@nestjs/common';

@Injectable()
export class GuestsService {
  findAllGuests() {
    return [
      {
        id: 1,
        guest: 'José',
      },
      {
        id: 2,
        guest: 'João',
      },
      {
        id: 3,
        guest: 'Maria',
      },
    ];
  }

  findOneGuests() {
    return 'Retornando um único convidado';
  }
}
