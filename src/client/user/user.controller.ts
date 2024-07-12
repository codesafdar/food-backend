import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { RequestOtpDto } from './dtos/reqOtp.dto';
import { RegisterUserDto } from './dtos/register.dto';
import { UserService } from './user.service';
import { VerifyDto } from './dtos/verifyOTP.dto';

@Controller('user')
export class UserController {
  // define constructor to access services/classes here
  constructor(private readonly userService: UserService) { }

  @Post('register')
  register(@Body() userData: RegisterUserDto) {
    return this.userService.createUser(userData)
  }

  @HttpCode(200)
  @Post('req-otp')
  async createOTP(@Body() data: RequestOtpDto) {
    return this.userService.requestOtp(data)
  }

  @HttpCode(200)
  @Get('verify-otp')
  async verifyOTP(@Query() code: VerifyDto) {
    console.log("🚀 ~ UserController ~ verifyOTP ~ code:", code)
    const { otp } = code
    return this.userService.verifyUserOTP(otp)
  }
}
