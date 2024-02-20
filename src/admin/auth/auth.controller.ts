import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshJwtGuard } from "./guards/refresh-jwt-auth.guard";

@Controller('admin')
export class AuthController {
  constructor(private authService: AuthService) { }

  // admin login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  getRefreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user)
  }

}