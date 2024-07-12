import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt'
import { CreateAdminDto, CustomError } from "@/src/libs";
import { Create_Admin } from "./create-admin.schema";
import { Model } from 'mongoose'

@Injectable()
export class CreateAdminService {
  constructor(@InjectModel('Create_Admin') private createAdminModel: Model<Create_Admin>) { }


  // hash password method
  async hashPass(password: string) {
    const getSalt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(password, getSalt)
    return hashedPass
  }

  async create(data: CreateAdminDto) {
    try {
      const { email, password, role } = data

      const userExists = await this.createAdminModel.findOne({ email })
      if (userExists) 
        throw ({ message: 'User with this email already exists', status: HttpStatus.BAD_REQUEST })
      // if (role !== 'super_admin') {
      //   return CustomError('You are not authorized to access', HttpStatus.FORBIDDEN)
      // }

      // hash the password
      const hashedPass = await this.hashPass(password)

      data = { ...data, password: hashedPass }
      const newAdmin = new this.createAdminModel(data)
      const res = await newAdmin.save()

      if (!res) {
        return CustomError('Internal server error', HttpStatus.SERVICE_UNAVAILABLE)
      }
      return 'Admin user created successfully'
    }
    catch (err) {
      return CustomError(err.message, err.status)
    }
  }

  // get all users
  async getAllUsers() {
    try {
      const res = await this.createAdminModel.find()
      if (!res) {
        return CustomError('Data not found', HttpStatus.NOT_FOUND)
      }
      return res
    }
    catch (err) {
      return CustomError(err.response, err.status)
    }
  }

  // delete user
  async deleteUser(id: string) {
    try {
      const deletedItem = await this.createAdminModel.findByIdAndDelete(id)
      if (!deletedItem) {
        return CustomError('Item does not exist', HttpStatus.NOT_FOUND)
      }
      return deletedItem
    }
    catch (err) {
      return CustomError(err.response, err.status)
    }
  }

  // update user role
  async updateRole(id: string, data: any) {
    try {
      let { password, ...result } = data
      if (password) {
        const hashedPass = await this.hashPass(password)
        result.password = hashedPass
      }
      const user = await this.createAdminModel.findByIdAndUpdate(id, result, { new: true })
      if (!user) {
        return CustomError('Item does not exist', HttpStatus.NOT_FOUND)
      }
      return user
    }
    catch (err) {
      return CustomError(err.response, err.status)
    }
  }
}