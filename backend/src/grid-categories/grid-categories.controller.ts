import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { response } from 'express';
import { GridCategoriesService } from './grid-categories.service';
import { GridCategories } from './schemas/grid-categories.schema';

@Controller('grid-categories')
export class GridCategoriesController {
  constructor(private readonly gridCategoriesService: GridCategoriesService) {}

  @Post()
  async createGridCategories(
    @Res() response,
    @Body() gridCategories: GridCategories,
  ) {
    const newGridCategories = await this.gridCategoriesService.create(
      gridCategories,
    );
    return response.status(HttpStatus.CREATED).json({
      newGridCategories,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const gridCategories = await this.gridCategoriesService.findAll();

    return response.status(HttpStatus.OK).json({
      gridCategories,
    });
  }
}
