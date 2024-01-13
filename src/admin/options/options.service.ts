import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Options } from './options.schema';
import { OptionsDto } from '@libs/dtos/options';
import { CustomError } from '@libs/common';

@Injectable()
export class OptionsService {
  constructor(@InjectModel('Options') private optionsModel: Model<Options>) { }

  async create(body: OptionsDto) {
    try {
      const res = await new this.optionsModel(body)
      const data = res.save()
      if (!data) {
        return CustomError('Something went wrong', HttpStatus.BAD_REQUEST)
      }
      return data
    }
    catch (err) {
      return CustomError(err.response, err.status)
    }
  }

  async getAll() {
    try {
      const res = await this.optionsModel.find()
      if (!res) {
        return CustomError('Data not found', HttpStatus.NOT_FOUND)
      }
      return res
    }
    catch (err) {
      return CustomError(err.response, err.status)
    }
  }

  async update(id: string, data: OptionsDto) {
    try{
      const res = await this.optionsModel.findByIdAndUpdate(id, data, { new: true })
      if (!res) {
        throw new NotFoundException('Data does not exist')
        return CustomError('Data does not exist',HttpStatus.NOT_FOUND)
      }
      return res
    }
   catch(err){
       return CustomError(err.message, err.status)
   }
  }

  async delete(id: string) {
    try {
      const deletedItem = await this.optionsModel.findByIdAndDelete(id)
      if (!deletedItem) {
        return CustomError('Item does not exist', HttpStatus.NOT_FOUND)
      }
      return deletedItem
    }
    catch (err) {
      return CustomError(err.response, err.status)
    }
  }

}
