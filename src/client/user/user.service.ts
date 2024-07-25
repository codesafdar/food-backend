import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, OTP } from './user.schema';
import { CustomError } from '@/src/libs';
import { RequestOtpDto } from './dtos/reqOtp.dto';
// import { generateOTP } from '@/utils/codeGenerator';
// import { sendMessage } from '@/src/libs/sendMessage';
import { getExpiry, isTokenExpired } from '@/utils/dateTimeUtility';
import { UserDto, VerifyDto } from './dtos/verifyOTP.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>, @InjectModel('OTP') private otpModel: Model<OTP>) { }

  // create new user 
  async createUser(user: RegisterUserDto) {
    try {
      const { mobileNumber, country: { dial_code } } = user
      const userAlreadyExists = await this.userModel.findOne({ mobileNumber, 'country.dial_code': dial_code })
      if (userAlreadyExists)
        throw { message: 'User with this mobile number already exists', status: HttpStatus.BAD_REQUEST, userExists: '' }

      const data = new this.userModel(user)
      const response = await data.save()
      if (!response)
        throw ({ message: 'Internal server error', status: HttpStatus.BAD_REQUEST })
      return { message: 'User created successfully', status: HttpStatus.CREATED, userExists: '' }
    }
    catch (err) {
      return CustomError(err.message, err.status)
    }
  }

  // request OTP to verify mobile number
  async requestOtp(data: RequestOtpDto) {
    try {
      const { mobileNumber, country: { dial_code } } = data
      const isUserExist = await this.userModel.findOne({ mobileNumber, 'country.dial_code': dial_code })

      if (!isUserExist)
        return ({ userExists: 'no', message: 'Please register first to login', status: HttpStatus.OK })

      const userPreviousOtpData = await this.otpModel.findOne({ userId: isUserExist._id })
      if (userPreviousOtpData) {
        await this.otpModel.deleteOne({ _id: userPreviousOtpData._id })
      }

      // will uncomment on purchasing sms service
      // const otp = generateOTP(6)
      // const formattedNumber: string = ('92' + mobileNumber).toString().replace('-', '')
      // await sendMessage(formattedNumber, otp)

      const userInfo = new this.otpModel({
        userId: isUserExist?._id,
        otp: '000000',
        expiresAt: getExpiry()
      })
      await userInfo.save()
      return { message: 'OTP sent to your mobile number', userExists: 'yes', status: HttpStatus.OK }
    }
    catch (err) {
      console.log("err:", err)
      return CustomError(err.message, err.status)
    }
  }

  async verifyUserOTP(otp: string) {
    try {
      const isValidOTP = await this.otpModel.findOne({ otp })
      if (!isValidOTP)
        throw ({ message: 'Invalid code', status: HttpStatus.BAD_REQUEST })

      const isCodeExpired = isTokenExpired(isValidOTP.expiresAt)
      if (isCodeExpired)
        throw ({ message: 'Your OTP is expired, please try again', status: HttpStatus.BAD_REQUEST })

      // delete token after verification
      await this.otpModel.deleteOne({ _id: isValidOTP._id })

      return { message: 'Successfully log in', status: HttpStatus.ACCEPTED }
    }
    catch (err) {
      return CustomError(err.message, err.status)
    }
  }

  async getUserDetail(info: UserDto) {
    try {
      const { mobileNumber, dial_code } = info
      const userData = await this.userModel.findOne({ mobileNumber, 'country.dial_code': dial_code })

      // return back if user not exists
      if (!userData)
        throw ({ message: 'Something went wrong', status: HttpStatus.NOT_FOUND })

      return { user: userData }
    }
    catch (err) {
      console.log("err:", err)
      return CustomError(err.message, err.status)
    }
  }
}

