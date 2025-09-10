import { Controller, Get } from '@nestjs/common';
import { GuestsService } from './guests.service';

@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @Get()
  findAllGuests() {
    return this.guestsService.findAllGuests();
  }

  @Get(':id')
  findOneGuests() {
    return this.guestsService.findOneGuests();
  }
}
