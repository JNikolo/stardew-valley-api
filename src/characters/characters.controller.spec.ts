import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { Character } from '../generated/prisma/client';
import { $Enums } from '../generated/prisma/client';

describe('CharactersController', () => {
  let controller: CharactersController;
  let service: jest.Mocked<CharactersService>;

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
    const mockCharactersService = {
      characters: jest.fn(),
      character: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        {
          provide: CharactersService,
          useValue: mockCharactersService,
        },
      ],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
    service = module.get(CharactersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of characters', async () => {
      service.characters.mockResolvedValue(mockCharacters);

      const result = await controller.findAll();

      expect(result).toEqual(mockCharacters);
      expect(service.characters).toHaveBeenCalledWith({});
    });

    it('should return an empty array when no characters exist', async () => {
      service.characters.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.characters).toHaveBeenCalledWith({});
    });

    it('should call characters service with empty params object', async () => {
      service.characters.mockResolvedValue(mockCharacters);

      await controller.findAll();

      expect(service.characters).toHaveBeenCalledTimes(1);
      expect(service.characters).toHaveBeenCalledWith({});
    });
  });

  describe('findOne', () => {
    it('should return a single character by id', async () => {
      service.character.mockResolvedValue(mockCharacter);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockCharacter);
      expect(service.character).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null when character is not found', async () => {
      service.character.mockResolvedValue(null);

      const result = await controller.findOne('999');

      expect(result).toBeNull();
      expect(service.character).toHaveBeenCalledWith({ id: 999 });
    });

    it('should convert string id to number', async () => {
      service.character.mockResolvedValue(mockCharacter);

      await controller.findOne('42');

      expect(service.character).toHaveBeenCalledWith({ id: 42 });
    });

    it('should handle different valid id values', async () => {
      service.character.mockResolvedValue(mockCharacter2);

      const result = await controller.findOne('2');

      expect(result).toEqual(mockCharacter2);
      expect(service.character).toHaveBeenCalledWith({ id: 2 });
    });

    it('should handle id of 0 (edge case for Number conversion)', async () => {
      service.character.mockResolvedValue(null);

      await controller.findOne('0');

      expect(service.character).toHaveBeenCalledWith({ id: 0 });
    });

    it('should handle large id values', async () => {
      service.character.mockResolvedValue(null);

      await controller.findOne('999999');

      expect(service.character).toHaveBeenCalledWith({ id: 999999 });
    });
  });
});
