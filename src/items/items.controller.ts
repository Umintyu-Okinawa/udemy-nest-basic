import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from '@prisma/client';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findById(id);
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto);
  }

  @Put(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'ON_SALE' | 'SOLD_OUT',
  ): Promise<Item> {
    return this.itemsService.updateStatus(id, { status });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.itemsService.delete(id);
  }
}