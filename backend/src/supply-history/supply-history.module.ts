import { Module } from '@nestjs/common';
import { SupplyHistoryService } from './supply-history.service';

@Module({
  providers: [SupplyHistoryService],
})
export class SupplyHistoryModule {}
