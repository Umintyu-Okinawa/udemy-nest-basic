import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemStatus } from '@prisma/client';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

//テストケースを作成
describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;
  let prismaService: PrismaService;


  //ダミー関数を作成
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

  //findAllメソッドをテスト
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

  //createメソッドをテスト
  describe('create', () => {
    //正常系：アイテムが正常に作成される
    it('should create an item successfully', async () => {
      // 1. テストデータの準備
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

      // 2. サービスメソッドをモック化
      jest.spyOn(service, 'create').mockResolvedValue(mockCreatedItem);

      // 3. コントローラーメソッドを実行
      const result = await controller.create(createItemDto, {
        user: mockUser,
      } as any);

      // 4. 結果の検証
      expect(result).toEqual(mockCreatedItem);
      expect(service.create).toHaveBeenCalledWith(createItemDto, mockUser.id);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    //正常系：descriptionがオプショナルな場合
    it('should create an item without description', async () => {
      const createItemDto = {
        name: 'Item without description',
        price: 100,
      };
      const mockUser = { id: 'user-123', name: 'Test User', status: 'ACTIVE' };
      const mockCreatedItem = {
        id: '2',
        name: createItemDto.name,
        price: createItemDto.price,
        description: null,
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

  //updateStatusメソッドをテスト
  describe('updateStatus', () => {
    //正常系：ステータスが正常に更新される
    it('should update item status successfully', async () => {
      // 1. テストデータの準備
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

      // 2. サービスメソッドをモック化
      jest.spyOn(service, 'updateStatus').mockResolvedValue(updatedItem);

      // 3. コントローラーメソッドを実行
      const result = await controller.updateStatus(
        '1',
        ItemStatus.SOLD_OUT,
        { user: mockUser } as any,
      );

      // 4. 結果の検証
      expect(result).toEqual(updatedItem);
      expect(service.updateStatus).toHaveBeenCalledWith(
        '1',
        { status: ItemStatus.SOLD_OUT },
        mockUser.id,
      );
      expect(service.updateStatus).toHaveBeenCalledTimes(1);
    });

    //異常系：アイテムが見つからない場合
    it('should throw NotFoundException when item not found', async () => {
      const mockUser = { id: 'user-123', name: 'Test User', status: 'ACTIVE' };

      jest
        .spyOn(service, 'updateStatus')
        .mockRejectedValue(new NotFoundException('Item not found'));

      await expect(
        controller.updateStatus('999', ItemStatus.SOLD_OUT, {
          user: mockUser,
        } as any),
      ).rejects.toThrow(NotFoundException);

      expect(service.updateStatus).toHaveBeenCalledWith(
        '999',
        { status: ItemStatus.SOLD_OUT },
        mockUser.id,
      );
    });

    //異常系：他のユーザーのアイテムを更新しようとした場合
    it('should throw ForbiddenException when user does not own the item', async () => {
      const mockUser = { id: 'user-123', name: 'Test User', status: 'ACTIVE' };

      jest
        .spyOn(service, 'updateStatus')
        .mockRejectedValue(
          new ForbiddenException('You can only update your own items'),
        );

      await expect(
        controller.updateStatus('1', ItemStatus.SOLD_OUT, {
          user: mockUser,
        } as any),
      ).rejects.toThrow(ForbiddenException);

      expect(service.updateStatus).toHaveBeenCalledWith(
        '1',
        { status: ItemStatus.SOLD_OUT },
        mockUser.id,
      );
    });

    //正常系：ON_SALEに戻す場合
    it('should update status to ON_SALE', async () => {
      const mockUser = { id: 'user-123', name: 'Test User', status: 'ACTIVE' };
      const updatedItem = {
        id: '1',
        name: 'Item 1',
        price: 100,
        description: 'Description',
        status: ItemStatus.ON_SALE,
        userId: mockUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'updateStatus').mockResolvedValue(updatedItem);

      const result = await controller.updateStatus(
        '1',
        ItemStatus.ON_SALE,
        { user: mockUser } as any,
      );

      expect(result.status).toBe(ItemStatus.ON_SALE);
      expect(service.updateStatus).toHaveBeenCalledWith(
        '1',
        { status: ItemStatus.ON_SALE },
        mockUser.id,
      );
    });
  });

  //deleteメソッドをテスト
  describe('delete', () => {
    //正常系：アイテムが正常に削除される
    it('should delete an item successfully', async () => {
      // 1. テストデータの準備
      const mockUser = { id: 'user-123', name: 'Test User', status: 'ACTIVE' };

      // 2. サービスメソッドをモック化（削除はvoidを返す）
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);

      // 3. コントローラーメソッドを実行
      await controller.delete('1', { user: mockUser } as any);

      // 4. 結果の検証（削除は例外が発生しないことを確認）
      expect(service.delete).toHaveBeenCalledWith('1', mockUser.id);
      expect(service.delete).toHaveBeenCalledTimes(1);
    });

    //異常系：アイテムが見つからない場合
    it('should throw NotFoundException when item not found', async () => {
      const mockUser = { id: 'user-123', name: 'Test User', status: 'ACTIVE' };

      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(new NotFoundException('Item not found'));

      await expect(
        controller.delete('999', { user: mockUser } as any),
      ).rejects.toThrow(NotFoundException);

      expect(service.delete).toHaveBeenCalledWith('999', mockUser.id);
    });

    //異常系：他のユーザーのアイテムを削除しようとした場合
    it('should throw ForbiddenException when user does not own the item', async () => {
      const mockUser = { id: 'user-123', name: 'Test User', status: 'ACTIVE' };

      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(
          new ForbiddenException('You can only delete your own items'),
        );

      await expect(
        controller.delete('1', { user: mockUser } as any),
      ).rejects.toThrow(ForbiddenException);

      expect(service.delete).toHaveBeenCalledWith('1', mockUser.id);
    });
  });
});
