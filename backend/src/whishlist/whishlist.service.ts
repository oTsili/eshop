import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWhishlistItemDto } from './dto/create-whishlist.dto';
import {
  WhishlistItemDocument,
  WhishlistItem,
} from './schemas/whishlist.schema';

@Injectable()
export class WhishlistService {
  constructor(
    @InjectModel(WhishlistItem.name)
    private whishlistItemModel: Model<WhishlistItemDocument>,
  ) {}

  async findWhishlistByUserId(userId) {
    return this.whishlistItemModel
      .find({ user: userId })
      .populate('product')
      .populate('user');
  }

  async create(
    createWhishlistItemDto: CreateWhishlistItemDto,
  ): Promise<WhishlistItem> {
    const createWhishlistItem = new this.whishlistItemModel(
      createWhishlistItemDto,
    );

    return createWhishlistItem.save();
  }

  async delete(id): Promise<any> {
    return await this.whishlistItemModel.findByIdAndRemove(id);
  }
}
