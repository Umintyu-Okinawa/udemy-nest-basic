import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from '@prisma/client';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Item {
    return this.itemsService.findById(id);
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto);
  }

  @Put(':id')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'ON_SALE' | 'SOLD_OUT',
  ): Item {
    return this.itemsService.update(id, { status });
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.itemsService.delete(id);
  }
}