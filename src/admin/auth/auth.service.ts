// import { CustomError } from '@/src/libs';
import { Injectable } from '@nestjs/common';
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

    if (!['admin','super_admin'].includes(userData?.role)) {
      return null
    }

    // if user not exist
    if (!userData) {
      return null
    }

    // verify password
    const validatedPass = await bcrypt.compare(password, userData?.password)
    if (!validatedPass) {
      return null
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

    // sign access and refresh tokens
    const token = await this.createToken.createJwtToken(payload, '600s');
    const refreshToken = await this.createToken.createJwtToken(payload, '7d');

    return {
      access_token: token,
      ...user,
      refresh_token: refreshToken
    }
  }

  // refresh token
  async refreshToken(user: any) {
    const newAccessToken = await this.createToken.createJwtToken(user, '600s');
    const refreshToken = await this.createToken.createJwtToken(user, '7d');

    return {
      access_token: newAccessToken,
      refresh_token: refreshToken,
    };
  }
}
