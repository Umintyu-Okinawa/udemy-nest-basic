import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.model';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/')
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get('/:id') // /items/:id
  findById(@Param('id') id: string): Item {
    return this.itemsService.findById(id);
  }

  @Post('/')
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ) {
    const item: Item = {
      id,
      name,
      price,
      description,
      status: 'ON_SALE',
    };
    return this.itemsService.create(item);
  }
}