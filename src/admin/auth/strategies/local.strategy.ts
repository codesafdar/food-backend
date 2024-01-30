import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "@/src/admin/auth/auth.service";
import { HttpStatus, Injectable } from "@nestjs/common";
import { CustomError } from "@/src/libs";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      email: 'username',
      password: 'password',
    })
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      return CustomError('Please provide valid credentials', HttpStatus.BAD_REQUEST)
    }
    return user
  }
}