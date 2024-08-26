import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrdersDto } from './dto/create.orders.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Orders } from './orders.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Orders') private orderModel: Model<Orders>) { }
  async createOrder(data: CreateOrdersDto) {
    try {
      if (!data)
        throw new BadRequestException('Data not found');

      await this.orderModel.create(data)
      return 'success'
    }
    catch (err) {
      if (err instanceof BadRequestException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to create user order');
    }
  }
}
