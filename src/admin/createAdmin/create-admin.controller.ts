import { Body, Controller, UseGuards, Req, Post } from "@nestjs/common";
import { CreateAdminService } from "./create-admin.service";
import { CreateAdminDto } from "@/src/libs";
import { JwtGuard } from "../auth/guards/jwt-auth.guard";
// import { AuthGuard } from "../auth/auth.guard";
// import { LocalAuthGuard } from "../auth/guards/local-auth.guard";

@Controller('admin')
export class createNewAdmin {
  constructor(private createAdminService: CreateAdminService) { }
  
  @UseGuards(JwtGuard)
  @Post('create-admin')
  createAdmin(@Body() data: CreateAdminDto, @Req() req: any) {
    return this.createAdminService.create(data, req)
  }
}
