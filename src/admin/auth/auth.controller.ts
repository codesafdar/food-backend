import { Controller, Post, Get, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminDto, LoginDto } from "@/src/libs";


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // admin login
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }

// create new admin
  @Post('create-admin')
  createAdmin(@Body() body: CreateAdminDto) {
    return this.authService.createAdmin(body)
  }
}