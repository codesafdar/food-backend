import { Body, Controller, Get, Put, Param, Delete, HttpException, UseInterceptors, UploadedFile } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto } from "@libs/dtos/product";
import { Product } from "./product.schema";
import { ModifyResult } from "mongoose";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "@/src/cloudinary/cloudinary.service";


@Controller('product')
export class ProductController {
  constructor(private productService: ProductService, private cloudinaryService: CloudinaryService) { }

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async addProduct(@Body() body: ProductDto, @UploadedFile() file: Express.Multer.File): Promise<Product | HttpException> {
    let getURL: string
    if (file) {
      const imageURL = await this.cloudinaryService.uploadFile(file)
      getURL = imageURL.url
    } else getURL = ''

    body = {
      ...body,
      image: getURL
    }
    return await this.productService.create(body)
  }

  @Get('getall')
  async getAllProducts(): Promise<Product[] | HttpException> {
    return await this.productService.getAll()
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(@Param('id') id: string, @Body() body: ProductDto, @UploadedFile() file: Express.Multer.File): Promise<Product | HttpException> {

    let getURL: string
    if (file) {
      const imageURL = await this.cloudinaryService.uploadFile(file)
      getURL = imageURL.url
      body = {
        ...body,
        image: getURL
      }
    }
    return await this.productService.update(id, body)
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<ModifyResult<Product> | HttpException> {
    return await this.productService.delete(id)
  }
}