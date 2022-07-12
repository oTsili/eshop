import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { Colors, ColorsSchema } from './schemas/colors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Colors.name, schema: ColorsSchema }]),
  ],
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class ColorsModule {}
