import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { WhishlistItem, WhishlistItemSchema } from './schemas/whishlist.schema';
import { WhishlistController } from './whishlist.controller';
import { WhishlistService } from './whishlist.service';

@Module({
  controllers: [WhishlistController],
  providers: [WhishlistService],
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: WhishlistItem.name, schema: WhishlistItemSchema },
    ]),
  ],
  exports: [WhishlistService],
})
export class WhishlistModule {}
