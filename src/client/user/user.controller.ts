import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, Delete } from '@nestjs/common';
import { RequestOtpDto } from './dtos/reqOtp.dto';
import { FavoriteDto, RegisterUserDto } from './dtos/register.dto';
import { UserService } from './user.service';
import { UserDto, VerifyDto } from './dtos/verifyOTP.dto';
import { UserAddressDto } from './dtos/address.dto';

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
    const { otp } = code
    return this.userService.verifyUserOTP(otp)
  }

  @HttpCode(200)
  @Get('detail')
  async userDetail(@Query() info: UserDto) {
    return this.userService.getUserDetail(info)
  }

  @Put('profile/:id')
  async updateProfile(@Param('id') id: string, @Body() updatedProfile: RegisterUserDto) {
    return this.userService.updateUserProfile(id, updatedProfile)
  }

  @Post('favorite/:userId')
  async handleFavorite(@Param('userId') userId: string, @Body() data: FavoriteDto) {
    return this.userService.addRemoveFavorite(userId, data)
  }

  @Put('address/:userId')
  async addAddress(@Param('userId') userId: string, @Body() data: UserAddressDto) {
    return await this.userService.addUserAddress(userId, data)
  }

  @Delete('address/:userId')
  async deleteAddress(@Param('userId') userId: string, @Query('addressId') addressId: string) {
    return  await this.userService.deleteAddress(userId, addressId)
  }

}
