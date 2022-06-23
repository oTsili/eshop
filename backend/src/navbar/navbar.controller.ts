import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { response } from 'express';
import { NavbarService } from './navbar.service';
import { NavBarElement } from './schemas/navbar.schema';

@Controller('navbar')
export class NavbarController {
  constructor(private readonly navBarService: NavbarService) {}

  @Post()
  async createNavBarElement(
    @Res() response,
    @Body() navBarElement: NavBarElement,
  ) {
    const newNavBarElement = await this.navBarService.create(navBarElement);

    return response.status(HttpStatus.CREATED).json({
      newNavBarElement,
    });
  }
}
