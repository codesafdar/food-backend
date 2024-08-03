import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoriteDto, RegisterUserDto } from './dtos/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, OTP } from './user.schema';
import { CustomError } from '@/src/libs';
import { RequestOtpDto } from './dtos/reqOtp.dto';
// import { generateOTP } from '@/utils/codeGenerator';
// import { sendMessage } from '@/src/libs/sendMessage';
import { getExpiry, isTokenExpired } from '@/utils/dateTimeUtility';
import { UserDto, VerifyDto } from './dtos/verifyOTP.dto';
import { userInfo } from 'os';


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

      return { message: 'Successfully logged in', status: HttpStatus.ACCEPTED }
    }
    catch (err) {
      return CustomError(err.message, err.status)
    }
  }

  async getUserDetail(info: UserDto) {
    try {
      const { mobileNumber, dial_code } = info
      const userData = await this.userModel.findOne({ mobileNumber, 'country.dial_code': dial_code }).populate({
        path: 'favorites',
        model: 'Products' // Ensure the correct model name
      })
        .exec();

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

  // update user profile
  async updateUserProfile(id: string, userData: RegisterUserDto) {
    try {
      const isUserExist = await this.userModel.findById(id)
      if (!isUserExist) {
        throw ({ message: 'User not found', status: HttpStatus.NOT_FOUND })
      }
      // update user profile
      const response = await this.userModel.findByIdAndUpdate(id, userData, { new: true })
      return { message: 'Updated successfully' }
    }
    catch (err) {

    }
  }

  // add/remove favorite
  async addRemoveFavorite(userId: string, data: FavoriteDto) {
    try {
      const { productId } = data
      const user = await this.userModel.findById(userId)

      const favoriteExists = await this.userModel.findOne({
        "favorites": productId
      })

      if (favoriteExists) {
        await this.userModel.updateOne(
          { _id: userId },
          { $pull: { favorites: productId } } // remove the product with the specified productId
        )
        return { message: 'Removed' }
      } else {
        user.favorites.push(productId)
        await user.save()
        return { message: 'Added' }
      }
    }
    catch (err) {

    }
  }
}

