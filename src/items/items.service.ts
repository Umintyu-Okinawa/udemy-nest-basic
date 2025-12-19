import { Injectable, NotFoundException } from '@nestjs/common';
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

  async updateStatus(id: string, patch: Partial<Omit<Item, 'id'>>): Promise<Item> {
    try {
      return await this.prismaService.item.update({
        where: { id },
        data: patch,
      });
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prismaService.item.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const{name,price,description} = createItemDto;
    return await this.prismaService.item.create({
      data:{
        name,
        price,
        description,
        status: ItemStatus.ON_SALE as ItemStatus,
        userId:"",
      },
    });
  }

  
}
