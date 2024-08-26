import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrdersDto } from './dto/create.orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  create(@Body() data: CreateOrdersDto) {
  return this.ordersService.createOrder(data)
  }
}
