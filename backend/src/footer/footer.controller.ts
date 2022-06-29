import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { FooterService } from './footer.service';
import { Footer } from './schemas/footer.schema';

@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) {}

  @Post()
  async createFooter(@Res() response, @Body() footer: Footer) {
    const newFooter = await this.footerService.create(footer);

    return response.status(HttpStatus.CREATED).json({
      newFooter,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const footer = await this.footerService.findAll();
    return response.status(HttpStatus.OK).json({ footer });
  }
}
