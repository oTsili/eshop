import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { CartItem, CartItemDocument } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartItem.name) private cartModel: Model<CartItemDocument>,
  ) {}

  async findCartItemsByUserId(userId: string) {
    return this.cartModel
      .find({ user: userId })
      .populate('product')
      .populate('user');
  }

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const createCartItem = new this.cartModel(createCartItemDto);
    return createCartItem.save();
  }

  async delete(id): Promise<any> {
    return await this.cartModel.findByIdAndRemove(id);
  }
}
