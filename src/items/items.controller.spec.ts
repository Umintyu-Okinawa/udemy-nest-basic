import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemStatus } from '@prisma/client';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    item: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        ItemsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined service', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const mockItems = [
        {
          id: '1',
          name: 'Item 1',
          price: 100,
          description: 'Description',
          status: ItemStatus.ON_SALE,
          userId: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockItems);

      const result = await controller.findAll();

      expect(result).toEqual(mockItems);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return an item when found', async () => {
      const mockItem = {
        id: '1',
        name: 'Item 1',
        price: 100,
        description: 'Description',
        status: ItemStatus.ON_SALE,
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'findById').mockResolvedValue(mockItem);

      const result = await controller.findById('1');

      expect(result).toEqual(mockItem);
      expect(service.findById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when item not found', async () => {
      jest
        .spyOn(service, 'findById')
        .mockRejectedValue(new NotFoundException('Item not found'));

      await expect(controller.findById('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create an item', async () => {
      const createItemDto = {
        name: 'New Item',
        price: 200,
        description: 'Description',
      };
      const mockUser = { id: 'user-123', name: 'Test User', status: 'ACTIVE' };
      const mockCreatedItem = {
        id: '1',
        ...createItemDto,
        status: ItemStatus.ON_SALE,
        userId: mockUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(mockCreatedItem);

      const result = await controller.create(createItemDto, {
        user: mockUser,
      } as any);

      expect(result).toEqual(mockCreatedItem);
      expect(service.create).toHaveBeenCalledWith(createItemDto, mockUser.id);
    });
  });

  describe('updateStatus', () => {
    it('should update item status', async () => {
      const mockUser = { id: 'user-123', name: 'Test User', status: 'ACTIVE' };
      const updatedItem = {
        id: '1',
        name: 'Item 1',
        price: 100,
        description: 'Description',
        status: ItemStatus.SOLD_OUT,
        userId: mockUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'updateStatus').mockResolvedValue(updatedItem);

      const result = await controller.updateStatus(
        '1',
        ItemStatus.SOLD_OUT,
        { user: mockUser } as any,
      );

      expect(result).toEqual(updatedItem);
      expect(service.updateStatus).toHaveBeenCalledWith(
        '1',
        { status: ItemStatus.SOLD_OUT },
        mockUser.id,
      );
    });
  });

  describe('delete', () => {
    it('should delete an item', async () => {
      const mockUser = { id: 'user-123', name: 'Test User', status: 'ACTIVE' };
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);

      await controller.delete('1', { user: mockUser } as any);

      expect(service.delete).toHaveBeenCalledWith('1', mockUser.id);
    });
  });
});
