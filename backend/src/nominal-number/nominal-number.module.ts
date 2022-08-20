import { Module } from '@nestjs/common';
import { NominalNumberService } from './nominal-number.service';

@Module({
  providers: [NominalNumberService]
})
export class NominalNumberModule {}
