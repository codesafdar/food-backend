import { JwtService } from "@nestjs/jwt";
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt'
import { CreateAdminDto, CustomError } from "@/src/libs";
import { Create_Admin } from "./create-admin.schema";
import { Model } from 'mongoose'

@Injectable()
export class CreateAdminService {
  constructor(@InjectModel('Create_Admin') private createAdminModel: Model<Create_Admin>, private jwtService: JwtService) { }
  async create(data: CreateAdminDto, req: any) {
    try {
      const { email, password } = data

      const token = req.user

      if (token.email !== 'safdarhussain2230@gmail.com') {
        return CustomError('You are not authorized to access', HttpStatus.FORBIDDEN)
      }
      const userExists = await this.createAdminModel.findOne({ email })

      if (userExists) {
        return CustomError('User with this email already exists', HttpStatus.BAD_REQUEST)
      }

      // hash the password
      const getSalt = await bcrypt.genSalt()
      const hashedPass = await bcrypt.hash(password, getSalt)
      data = { ...data, password: hashedPass }
      const newAdmin = await new this.createAdminModel(data)
      const res = await newAdmin.save()

      if (!res) {
        return CustomError('Internal server error', HttpStatus.SERVICE_UNAVAILABLE)
      }
      //  const {password, ...newRes} = res
      return 'Admin user created successfully'
    }
    catch (err) {
      return CustomError(err.message, err.status)
    }
  }
}