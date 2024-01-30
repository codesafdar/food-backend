import { Body, Controller, Param, Post, Get, Delete, Put, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "@libs/dtos";
import { JwtGuard } from "../auth/guards/jwt-auth.guard";
// import { AuthGuard } from "../auth/auth.guard";

@Controller('category')
@UseGuards(JwtGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Post('add')
  addCategory(@Body() dto: CategoryDto) {
    return this.categoryService.addCategory(dto)
  }

  @Get('getall')
  async getAll() {
    const data = await this.categoryService.getAllCategories()
    return data
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') categoryId: string) {
    const deletedCategory = await this.categoryService.deleteCategory(categoryId)
    return deletedCategory
  }

  @Put('/:id')
  async updateCat(@Param('id') categoryId: string, @Body() dto: CategoryDto) {
    const updatedCat = await this.categoryService.updateCat(categoryId, dto)
    return updatedCat
  }
}