import { Module } from '@nestjs/common';
import { AuthModule } from './admin/auth/auth.module';
import { CategoryModule } from './admin/category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionsModule } from './admin/options/options.module';
import { ProductModule } from './admin/product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    AuthModule, CategoryModule, OptionsModule, ProductModule,
    MongooseModule.forRoot('mongodb+srv://SafdarDeveloper:kallas@cluster0.pltv1.mongodb.net/food-ordering?retryWrites=true&w=majority'),
    CloudinaryModule, ConfigModule.forRoot(),
  ],
  providers: [],
})
export class AppModule { }
