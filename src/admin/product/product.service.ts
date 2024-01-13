import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model, ModifyResult } from 'mongoose';
import { ProductDto } from '@libs/dtos';
import { CustomError } from '@libs/common';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Products') private productModel: Model<Product>) { }

  // create data 
  async create(body: ProductDto) {
    try {
      let formatOption = body.optionsList
      formatOption = JSON.parse(formatOption as any)
      formatOption = JSON.parse(JSON.stringify(formatOption));
       
      body.optionsList = formatOption
      const res = await new this.productModel(body)
      const data = res.save()
      if (!data) {
        return CustomError('Internal server error', HttpStatus.BAD_REQUEST)
      }
      return data
    }
    catch (err) {
      return CustomError(err.message, err.response)
    }
  }

  // get data 
  async getAll(): Promise<Product[] | HttpException> {
    try {

      const getData: Product[] = await this.productModel.find()
      if (!getData) {
        return CustomError('Data not found', HttpStatus.NOT_FOUND)
      }
      return getData
    }
    catch (err) {
      console.log(err)
      return CustomError(err.message, err.response)
    }
  }

  // update
  async update(id: string, data: ProductDto): Promise<Product | HttpException> {
    try {
      let formatOption = data.optionsList
      formatOption = JSON.parse(formatOption as any)
      formatOption = JSON.parse(JSON.stringify(formatOption));
       
      data.optionsList = formatOption
      const updatedData: Product = await this.productModel.findByIdAndUpdate(id, data, { new: true })
      if (!updatedData) {
        return CustomError('Data not found', HttpStatus.NOT_FOUND)
      }
      return updatedData
    }
    catch (err) {
      return CustomError(err.message, err.response)
    }
  }

  // delete
  async delete(id: string): Promise<ModifyResult<Product> | HttpException> {
    try {
      const result: ModifyResult<Product> = await this.productModel.findByIdAndDelete(id)
      if (!result) {
        return CustomError('Data does not exist', HttpStatus.NOT_FOUND)
      }
      return result
    }
    catch (err) {
      return CustomError(err.message, err.response)
    }
  }
}
