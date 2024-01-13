import { Body, Controller, Get, Post, Put, Param, Delete } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsDto } from '@libs/dtos/options';
// import { ICategory } from '@libs/types/category';

@Controller('options')
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
