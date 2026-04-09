import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { PrismaService } from '../prisma.service';
import { Character, Prisma } from '../generated/prisma/client';
import { $Enums } from '../generated/prisma/client';

describe('CharactersService', () => {
  let service: CharactersService;
  let prismaService: jest.Mocked<PrismaService>;

  // Mock data for testing
  const mockCharacter: Character = {
    id: 1,
    name: 'Abigail',
    birthday_season: $Enums.Season.Summer,
    birthday_day: 13,
    lives_in: "Pierre's House",
    address: '1 River Road, Pelican Town',
    can_marriage: true,
    clinic_visit_season: $Enums.Season.Spring,
    clinic_visit_day: 12,
    loved_gifts: ['Golden Pumpkin', 'Pumpkin Soup', 'Ice Cream'],
    family: ['Pierre', 'Caroline', 'Sebastian'],
    relationships: [],
    schedule: [],
    character_image: '',
  };

  const mockCharacter2: Character = {
    id: 2,
    name: 'Alex',
    birthday_season: $Enums.Season.Summer,
    birthday_day: 14,
    lives_in: "Grandpa's Shed",
    address: '2 River Road, Pelican Town',
    can_marriage: true,
    clinic_visit_season: $Enums.Season.Spring,
    clinic_visit_day: 12,
    loved_gifts: ['Ordinary Mushroom', 'Risotto', 'Fried Calamari'],
    family: ['Grandpa'],
    relationships: [],
    schedule: [],
    character_image: '',
  };

  const mockCharacters: Character[] = [mockCharacter, mockCharacter2];

  beforeEach(async () => {
    // Create mock PrismaService with all required methods
    const mockPrismaService = {
      character: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('characters', () => {
    it('should return an empty array when no characters exist', async () => {
      (prismaService.character.findMany as jest.Mock).mockResolvedValue([]);

      const result = await service.characters({});

      expect(result).toEqual([]);
      expect(prismaService.character.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        cursor: undefined,
        where: undefined,
        orderBy: undefined,
      });
    });

    it('should return all characters when no params are provided', async () => {
      (prismaService.character.findMany as jest.Mock).mockResolvedValue(
        mockCharacters,
      );

      const result = await service.characters({});

      expect(result).toEqual(mockCharacters);
      expect(prismaService.character.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        cursor: undefined,
        where: undefined,
        orderBy: undefined,
      });
    });

    it('should pass skip and take params to prisma', async () => {
      (prismaService.character.findMany as jest.Mock).mockResolvedValue([
        mockCharacter,
      ]);

      const result = await service.characters({ skip: 0, take: 1 });

      expect(result).toEqual([mockCharacter]);
      expect(prismaService.character.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 1,
        cursor: undefined,
        where: undefined,
        orderBy: undefined,
      });
    });

    it('should pass where param to prisma for filtering', async () => {
      (prismaService.character.findMany as jest.Mock).mockResolvedValue([
        mockCharacter,
      ]);

      const where = { can_marriage: true };
      const result = await service.characters({ where });

      expect(result).toEqual([mockCharacter]);
      expect(prismaService.character.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        cursor: undefined,
        where: where,
        orderBy: undefined,
      });
    });

    it('should pass orderBy param to prisma for sorting', async () => {
      (prismaService.character.findMany as jest.Mock).mockResolvedValue(
        mockCharacters,
      );

      const orderBy: Prisma.CharacterOrderByWithRelationInput = { name: 'asc' };
      const result = await service.characters({ orderBy });

      expect(result).toEqual(mockCharacters);
      expect(prismaService.character.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        cursor: undefined,
        where: undefined,
        orderBy: orderBy,
      });
    });

    it('should pass multiple params to prisma', async () => {
      (prismaService.character.findMany as jest.Mock).mockResolvedValue([
        mockCharacter,
      ]);

      const params = {
        skip: 0,
        take: 10,
        where: { birthday_season: $Enums.Season.Summer },
        orderBy: { name: 'asc' as const },
      };
      const result = await service.characters(params);

      expect(result).toEqual([mockCharacter]);
      expect(prismaService.character.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        cursor: undefined,
        where: params.where,
        orderBy: params.orderBy,
      });
    });

    it('should filter characters by name', async () => {
      (prismaService.character.findMany as jest.Mock).mockResolvedValue([
        mockCharacter,
      ]);

      const result = await service.characters({ where: { name: 'Abigail' } });

      expect(result).toEqual([mockCharacter]);
      expect(prismaService.character.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        cursor: undefined,
        where: { name: 'Abigail' },
        orderBy: undefined,
      });
    });

    it('should filter characters by can_marriage', async () => {
      (prismaService.character.findMany as jest.Mock).mockResolvedValue(
        mockCharacters,
      );

      const result = await service.characters({
        where: { can_marriage: true },
      });

      expect(result).toEqual(mockCharacters);
      expect(prismaService.character.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        cursor: undefined,
        where: { can_marriage: true },
        orderBy: undefined,
      });
    });

    it('should handle cursor-based pagination', async () => {
      (prismaService.character.findMany as jest.Mock).mockResolvedValue([
        mockCharacter2,
      ]);

      const cursor = { id: 1 };
      const result = await service.characters({ cursor, take: 1 });

      expect(result).toEqual([mockCharacter2]);
      expect(prismaService.character.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: 1,
        cursor: cursor,
        where: undefined,
        orderBy: undefined,
      });
    });
  });

  describe('character', () => {
    it('should return a single character by id', async () => {
      (prismaService.character.findUnique as jest.Mock).mockResolvedValue(
        mockCharacter,
      );

      const result = await service.character({ id: 1 });

      expect(result).toEqual(mockCharacter);
      expect(prismaService.character.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null when character is not found', async () => {
      (prismaService.character.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.character({ id: 999 });

      expect(result).toBeNull();
      expect(prismaService.character.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });

    it('should call findUnique with correct params', async () => {
      (prismaService.character.findUnique as jest.Mock).mockResolvedValue(
        mockCharacter2,
      );

      const result = await service.character({ id: 2 });

      expect(result).toEqual(mockCharacter2);
      expect(prismaService.character.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.character.findUnique).toHaveBeenCalledWith({
        where: { id: 2 },
      });
    });
  });
});
