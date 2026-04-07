import { Controller, Get, Param } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Character as CharacterModel } from '../generated/prisma/client';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async findAll(): Promise<CharacterModel[]> {
    return this.charactersService.characters({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CharacterModel | null> {
    return this.charactersService.character({ id: Number(id) });
  }
}
