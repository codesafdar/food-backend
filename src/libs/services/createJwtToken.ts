import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CreateToken {
  constructor(private jwtService: JwtService) { }

  async createJwtToken(payload: any, expiry: string) {
    const token = await this.jwtService.signAsync(payload,
      {
        secret: `${process.env.JWT_SECRET}`,
        expiresIn: expiry
      })
    return token
  }
}
