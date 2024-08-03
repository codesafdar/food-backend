import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, OTPSchema } from './user.schema';
import { ProductSchema } from '@/src/admin/product/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'OTP', schema: OTPSchema },
  { name: 'Products', schema: ProductSchema }, 
  ])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
