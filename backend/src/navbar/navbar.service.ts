import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNavbarElementDto } from './dto/create-navbar.dto';
import { NavBarElement } from './schemas/navbar.schema';

@Injectable()
export class NavbarService {
  constructor(
    @InjectModel(NavBarElement.name)
    private navBarElementModel: Model<NavBarElement>,
  ) {}

  async create(
    createNavBarElementDto: CreateNavbarElementDto,
  ): Promise<NavBarElement> {
    const createNavBarElement = new this.navBarElementModel(
      createNavBarElementDto,
    );

    return createNavBarElement.save();
  }

  async findAll(): Promise<NavBarElement[]> {
    return this.navBarElementModel.find().exec();
  }
}
