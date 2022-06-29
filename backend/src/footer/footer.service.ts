import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFooterDto } from './dto/footer.dto';
import { Footer } from './schemas/footer.schema';

@Injectable()
export class FooterService {
  constructor(
    @InjectModel(Footer.name)
    private footerModel: Model<Footer>,
  ) {}

  async create(createFooterDto: CreateFooterDto): Promise<Footer> {
    const createFooter = new this.footerModel(createFooterDto);

    return createFooter.save();
  }

  async findAll(): Promise<Footer[]> {
    return this.footerModel.find().exec();
  }
}
