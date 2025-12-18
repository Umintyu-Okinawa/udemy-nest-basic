import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './items.model';

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

  create(item: Item) {
    this.items.push(item);
    return item;
  }
}
