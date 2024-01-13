import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminAuthSchema } from './auth.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Admin_Auth', schema: AdminAuthSchema }]),
  JwtModule.register({
    global: true,
    secret: '12345',
    signOptions: {expiresIn:  '293455s'}
  })
],
  controllers: [AuthController],
  providers: [AuthService]
})

export class AuthModule { }