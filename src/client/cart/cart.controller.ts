import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ProductService } from '@/src/admin/product/product.service';
import { Product } from '@/src/admin/product/product.schema';
import { CategoryService } from '@/src/admin/category/category.service';

@Controller('products')
export class CartController {
  constructor(private readonly cartService: CartService, private productService: ProductService, private categoryService: CategoryService) { }

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  async findAll(): Promise<Product[] | HttpException> {
    return await this.productService.getAll();
  }

  @Get('category')
  async findCategories() {
    return await this.categoryService.getAllCategories()
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }

  // filter by title
  @Get('filter')
  async filterProducts(@Query() query) {
    if (!query) throw new BadRequestException('Query parameter "search" is required')
    const res = await this.productService.findByFilter(query)
    return res
  }
}
