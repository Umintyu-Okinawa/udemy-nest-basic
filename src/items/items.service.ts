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




}
