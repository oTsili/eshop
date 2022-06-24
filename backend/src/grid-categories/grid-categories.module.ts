import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GridCategoriesController } from './grid-categories.controller';
import { GridCategoriesService } from './grid-categories.service';
import {
  GridCategories,
  GridCategoriesSchema,
} from './schemas/grid-categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GridCategories.name, schema: GridCategoriesSchema },
    ]),
  ],
  controllers: [GridCategoriesController],
  providers: [GridCategoriesService],
})
export class GridCategoriesModule {}
