import { Controller, Post, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemActionDto } from './dto/item-action.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // 💡 POST /items/buy
  @Post('buy')
  async buyItem(@Body() itemActionDto: ItemActionDto) {
    return await this.itemsService.buyItem(itemActionDto);
  }

  // 💡 POST /items/use
  @Post('use')
  async useItem(@Body() itemActionDto: ItemActionDto) {
    return await this.itemsService.useItem(itemActionDto);
  }
}