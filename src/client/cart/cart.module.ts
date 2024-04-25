import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartItemsSchema } from './cart.schema';
import { ProductModule } from '@/src/admin/product/product.module';
import { CategoryModule } from '@/src/admin/category/category.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'CartItems', schema: CartItemsSchema }]), ProductModule, CategoryModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule { }
