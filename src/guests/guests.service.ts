import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Injectable()
export class GuestsService {
  private guests = [
    {
      id: 1,
      name: 'Nome do Convidado',
    },
  ];

  findAll() {
    return this.guests;
  }

  findOne(id: number) {
    const guest = this.guests.find((guest) => guest.id === id);

    if (guest) return guest;

    throw new HttpException('Esse Convidado Não Existe!', HttpStatus.NOT_FOUND);
  }

  create(createGuestDto: CreateGuestDto) {
    const newId = this.guests.length + 1;

    const newGuest = {
      id: newId,
      ...createGuestDto,
    };

    this.guests.push(newGuest);

    return newGuest;
  }

  update(id: number, updateGuestDto: UpdateGuestDto) {
    const guestIndex = this.guests.findIndex((guest) => guest.id === id);

    if (guestIndex < 0) {
      throw new HttpException(
        'Esse Convidado Não Existe!',
        HttpStatus.NOT_FOUND,
      );
    }

    const guestItem = this.guests[guestIndex];

    this.guests[guestIndex] = {
      ...guestItem,
      ...updateGuestDto,
    };

    return this.guests[guestIndex];
  }

  delete(id: number) {
    const guestIndex = this.guests.findIndex((guest) => guest.id === id);

    if (guestIndex < 0) {
      throw new HttpException(
        'Esse Convidado Não Existe!',
        HttpStatus.NOT_FOUND,
      );
    }

    this.guests.splice(guestIndex, 1);

    return 'Convidado Excluído com Sucesso!';
  }
}
