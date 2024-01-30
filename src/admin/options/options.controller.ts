import { Body, Controller, Get, Post, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsDto } from '@libs/dtos/options';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@Controller('options')
@UseGuards(JwtGuard)
export class OptionsController {
  constructor(private optionsService: OptionsService) { }

  @Post('create')
  async addOption(@Body() body: OptionsDto) {
    return await this.optionsService.create(body)
  }

  @Get('getall')
  async getAllOptionData() {
    return await this.optionsService.getAll()
  }

  @Put('/:id')
  async updateOptionData(@Param('id') optionId: string, @Body() data: OptionsDto) {
    return await this.optionsService.update(optionId, data)

  }

  @Delete('delete/:id')
  async deleteOption(@Param('id') id: string) {
    return await this.optionsService.delete(id)
  }
}
