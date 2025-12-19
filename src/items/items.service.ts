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
    const index = this.items.findIndex((it) => it.id === id);
    if (index === -1) {
      throw new NotFoundException('Item not found');
    }

    

    const current = this.items[index];
    const updated: Item = { ...current, ...patch, id: current.id };
    this.items[index] = updated;
    return updated;
  }

  delete(id: string): void {
    const index = this.items.findIndex((it) => it.id === id);
    if (index === -1) {
      throw new NotFoundException('Item not found');
    }
    this.items.splice(index, 1);
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const{name,price,description} = createItemDto;
    return await this.prismaService.item.create({
      data:{
        name,
        price,
        description,
        status: ItemStatus.ON_SALE as ItemStatus,
      },
    });
  }

  
}
