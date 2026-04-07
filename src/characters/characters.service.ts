import { PrismaService } from '../prisma.service';
import { Character, Prisma } from '../generated/prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

  async characters(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CharacterWhereUniqueInput;
    where?: Prisma.CharacterWhereInput;
    orderBy?: Prisma.CharacterOrderByWithRelationInput;
  }): Promise<Character[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.character.findMany({
      skip: skip,
      take: take,
      cursor: cursor,
      where: where,
      orderBy: orderBy,
    });
  }

  async character(
    characterWhereUniqueInput: Prisma.CharacterWhereUniqueInput,
  ): Promise<Character | null> {
    return this.prisma.character.findUnique({
      where: characterWhereUniqueInput,
    });
  }
}
