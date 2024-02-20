import { Body, Controller, UseGuards, Req, Post, Get, Delete, Param, Put } from "@nestjs/common";
import { CreateAdminService } from "./create-admin.service";
import { CreateAdminDto } from "@/src/libs";
import { JwtGuard } from "../auth/guards/jwt-auth.guard";
// import { AuthGuard } from "../auth/auth.guard";
// import { LocalAuthGuard } from "../auth/guards/local-auth.guard";

@Controller('admin')
export class createNewAdmin {
  constructor(private createAdminService: CreateAdminService) { }

  // create admin
  @UseGuards(JwtGuard)
  @Post('create-admin')
  createAdmin(@Body() data: CreateAdminDto) {
    return this.createAdminService.create(data)
  }

  // get all users 
  @UseGuards(JwtGuard)
  @Get('get-users')
  getUsers() {
    return this.createAdminService.getAllUsers()
  }

  // delete admin
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.createAdminService.deleteUser(id)
  }

  // update admin role
  @UseGuards(JwtGuard)
  @Put(':id')
  updateRole(@Param('id') id: string, @Body() data: any) {
    return this.createAdminService.updateRole(id, data)
  }

}
