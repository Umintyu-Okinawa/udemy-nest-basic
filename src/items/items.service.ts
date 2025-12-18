import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './items.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [];

  findAll() {
    return this.items;
  }

  findById(id: string): Item {
    const item = this.items.find((it) => it.id === id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  update(id: string, patch: Partial<Omit<Item, 'id'>>): Item {
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

  create(createItemDto: CreateItemDto): Item {
    const item: Item = {
     id: uuid(),
      name: createItemDto.name,
      price: createItemDto.price,
      description: createItemDto.description,
      status: 'ON_SALE',
    };
    this.items.push(item);
    return item;
  }

}
