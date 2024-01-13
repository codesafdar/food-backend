import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { OptionDto } from '@libs/dtos/product';
import { CategoryDto } from '@libs/dtos';
import { CustomError } from '@libs/common';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private categoryModel: Model<Category>) { }

  // add category
  async addCategory(CategoryDto: CategoryDto): Promise<Category | HttpException> {
    try {
      const newCategory = await new this.categoryModel(CategoryDto)
      const data = newCategory.save()
      if (!data) {
        return CustomError('Internal server error', HttpStatus.BAD_REQUEST)
      }
      return data
    }
    catch (err) {
      return CustomError(err.message, err.status)
    }
  }

  // get all 
  async getAllCategories() {
    try {
      const data = await this.categoryModel.find()
      if (!data) {
        CustomError('Data not found', HttpStatus.BAD_REQUEST)
      }
      return data
    }
    catch (err) {
      CustomError(err.response, err.status)
    }
  }

  //  delete
  async deleteCategory(id: string) {
    try {
      const deletedCat = await this.categoryModel.findOneAndRemove({_id:id})
      if (!deletedCat) {
        CustomError('Category does not exist', HttpStatus.NOT_FOUND)
      }
      return deletedCat
    }
    catch (err) {
      CustomError(err.response, err.status)
    }
  }

  // update
  async updateCat(id: string, category: CategoryDto) {
    try {
      const getCat = await this.categoryModel.findById(id)
      if (!getCat) {
        CustomError('Category does not exist', HttpStatus.NOT_FOUND)
      }
      return await this.categoryModel.findByIdAndUpdate(id, category, { new: true })
    }
    catch (err) {
      CustomError(err.response, err.response)
    }
  }
}
