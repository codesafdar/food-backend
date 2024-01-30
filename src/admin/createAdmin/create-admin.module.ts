import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateAdminSchema } from './create-admin.schema';
import { CreateAdminService } from './create-admin.service';
import { createNewAdmin } from './create-admin.controller';

@Module({
  imports:
    [MongooseModule.forFeature([{ name: 'Create_Admin', schema: CreateAdminSchema }])],
  providers: 
  [CreateAdminService],
  controllers:
  [createNewAdmin]
})
export class CreateAdminModule { }
