import { Module } from '@nestjs/common';
import { AuthModule } from './admin/auth/auth.module';
import { CategoryModule } from './admin/category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionsModule } from './admin/options/options.module';
import { ProductModule } from './admin/product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CreateAdminModule } from './admin/createAdmin/create-admin.module';
import { ClientModule } from './client/addToCart/client.module';
import { CartModule } from './client/cart/cart.module';
import { UserModule } from './client/user/user.module';

@Module({
  imports: [
    AuthModule, CategoryModule, OptionsModule, ProductModule,
    // MongooseModule.forRoot('mongodb+srv://SafdarDeveloper:kallas@cluster0.pltv1.mongodb.net/food-ordering?retryWrites=true&w=majority'),
    CloudinaryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV=== 'production' ? '.env.prod' : '.env', // Ensure this points to your .env file if not in the root directory
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_CONNECTION'),
      }),
      inject: [ConfigService],
    }),
    CreateAdminModule,
    ClientModule,
    CartModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
