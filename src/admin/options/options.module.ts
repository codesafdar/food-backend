import { Module } from '@nestjs/common';
import { OptionsSchema } from './options.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Options', schema: OptionsSchema }])],
  controllers: [OptionsController],
  providers: [OptionsService]
})

export class OptionsModule { }
