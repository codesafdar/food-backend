import { CreateAdminDto, CustomError, LoginDto } from '@/src/libs';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(@InjectModel('Admin_Auth') private adminAuthModel, private jwtService: JwtService) { }

  async login(data: LoginDto) {
    const { email, password } = data

    if (!email || !password) {
      return CustomError('Please enter missing credentials', HttpStatus.BAD_REQUEST)
    }

    const getAdminData = await this.adminAuthModel.findOne({ email })

    if (!getAdminData) {
      return CustomError('User with this email does not exist', HttpStatus.NOT_FOUND)
    }

    const { _id, name } = getAdminData?.password
    const getPassword = getAdminData.password

    const isVerifiedPassword = await bcrypt.compare(password, getPassword)

    if (isVerifiedPassword) {
      const payload = { name, adminId: _id }
      const token = await this.jwtService.signAsync(payload)
      return token
    }
  }

  
  // create admin
  async createAdmin(data: CreateAdminDto) {
    try {
      const { email, password } = data

      const userExists = await this.adminAuthModel.findOne({ email })
      console.log("🚀 ~ file: auth.service.ts:32 ~ AuthService ~ createAdmin ~ userExists:", userExists)

      if (userExists) {
        return CustomError('User with this email already exists', HttpStatus.BAD_REQUEST)
      }

      // hash the password
      const getSalt = await bcrypt.genSalt()
      const hashedPass = await bcrypt.hash(password, getSalt)
      console.log("🚀 ~ file: auth.service.ts:32 ~ AuthService ~ createAdmin ~ hashedPass:", hashedPass)
      data = { ...data, password: hashedPass }
      const newAdmin = await new this.adminAuthModel(data)
      const res = newAdmin.save()

      if (!res) {
        return CustomError('Internal server error', HttpStatus.SERVICE_UNAVAILABLE)
      }
      return res
    }
    catch (err) {
      return CustomError(err.message, err.status)
    }
  }
}
