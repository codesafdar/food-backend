import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.schema';
import { ProductController } from './product.controllers';
import { ProductService } from './product.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
// import { MulterModule } from '@nestjs/platform-express';
// import { multerOptions } from '@libs/middlewares/multer.config';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Products', schema: ProductSchema }]),
  // MulterModule.register(multerOptions)
],
  controllers: [ProductController],
  providers: [ProductService, CloudinaryService]
})
export class ProductModule { }
