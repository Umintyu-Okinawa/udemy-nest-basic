import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from '@prisma/client';
import { ItemsService } from './items.service';
import { RequestUser } from 'src/types/requestUser';

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
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createItemDto: CreateItemDto,
    @Request() req: { user: RequestUser },
  ): Promise<Item> {
    return await this.itemsService.create(createItemDto, req.user.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'ON_SALE' | 'SOLD_OUT',
    @Request() req: { user: RequestUser },
  ): Promise<Item> {
    return this.itemsService.updateStatus(id, { status }, req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id') id: string,
    @Request() req: { user: RequestUser },
  ): Promise<void> {
    await this.itemsService.delete(id, req.user.id);
  }
}