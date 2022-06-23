import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NavbarController } from './navbar.controller';
import { NavbarService } from './navbar.service';
import { NavBarElement, NavBarElementSchema } from './schemas/navbar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NavBarElement.name, schema: NavBarElementSchema },
    ]),
  ],
  controllers: [NavbarController],
  providers: [NavbarService],
})
export class NavbarModule {}
