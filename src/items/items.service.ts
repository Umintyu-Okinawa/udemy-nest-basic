import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item, ItemStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Item[]> {
    return await this.prismaService.item.findMany();
  }

  async findById(id: string): Promise<Item> {
    const foundItem = await this.prismaService.item.findUnique({
      where: { id },
    });
    if (!foundItem) {
      throw new NotFoundException('Item not found');
    }
    return foundItem;
  }

  async updateStatus(
    id: string,
    patch: Partial<Omit<Item, 'id'>>,
    userId: string,
  ): Promise<Item> {
    const item = await this.prismaService.item.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    if (item.userId !== userId) {
      throw new ForbiddenException('You can only update your own items');
    }
    return await this.prismaService.item.update({
      where: { id },
      data: patch,
    });
  }

  async delete(id: string, userId: string): Promise<void> {
    const item = await this.prismaService.item.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    if (item.userId !== userId) {
      throw new ForbiddenException('You can only delete your own items');
    }
    await this.prismaService.item.delete({
      where: { id },
    });
  }

  async create(createItemDto: CreateItemDto, userId: string): Promise<Item> {
    const { name, price, description } = createItemDto;
    return await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        status: ItemStatus.ON_SALE as ItemStatus,
        userId,
      },
    });
  }
}
