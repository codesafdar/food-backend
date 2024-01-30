import { CustomError } from '@/src/libs';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { CreateToken } from '@/src/libs/services/createJwtToken';

@Injectable()
export class AuthService {
  constructor(@InjectModel('Create_Admin') private adminAuthModel: any,
    private jwtService: JwtService, private createToken: CreateToken) { }

  async validateUser(email: string, password: string) {
    const userData = await this.adminAuthModel.findOne({ email })

    // if user not exist
    if (!userData) {
      return CustomError('User does not exist', HttpStatus.NOT_FOUND)
    }

    // verify password
    const validatedPass = await bcrypt.compare(password, userData?.password)
    if (!validatedPass) {
      return CustomError('Please enter missing credentials', HttpStatus.BAD_REQUEST)
    }

    if (userData && validatedPass) {
      const { password, ...user } = userData.toObject()
      return user
    }
    return null
  }


  async login(user: any) {
    const { email, _id } = user;

    const payload = { email, userId: _id.toString() }

    console.log("🚀 ~ file: auth.service.ts:40 ~ AuthService ~ login ~ payload:", payload)
    // sign access and refresh tokens
    const token = await this.createToken.createJwtToken(payload, '60s')
    const refreshToken = await this.createToken.createJwtToken(payload, '70s')

    if (email === 'safdarhussain2230@gmail.com') {
      user.role = 'superAdmin'
    }

    return {
      access_token: token,
      ...user,
      refresh_token: refreshToken
    }
  }

  // refresh token
  async refreshToken(user: any) {
    const newAccessToken = await this.createToken.createJwtToken(user, '60s')
    const refreshToken = await this.createToken.createJwtToken(user, '70s')

    return {
      access_token: newAccessToken,
      refresh_token: refreshToken
    }
  }
}
