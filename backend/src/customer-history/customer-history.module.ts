import { Module } from '@nestjs/common';
import { CustomerHistoryService } from './customer-history.service';

@Module({
  providers: [CustomerHistoryService]
})
export class CustomerHistoryModule {}
