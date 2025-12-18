import { Injectable } from '@nestjs/common';
import { Item } from './items.model';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [];

  findAll() {
    return this.items;
  }

  create(item: Item) {
    this.items.push(item);
    return item;
  }
}
