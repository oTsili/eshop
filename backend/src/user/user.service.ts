import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  // lean true instructs mongoose to not return a mongoose document (with extra properties)
  // but the exact object.

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel
      .findOne({ email }, {}, { lean: true })
      .populate({
        path: 'account',
        populate: [
          {
            path: 'whishlist',
            populate: {
              path: 'product',
              model: 'Product',
            },
          },
          {
            path: 'cart',
            populate: {
              path: 'product',
              model: 'Product',
            },
          },
          {
            path: 'orders',
            populate: {
              path: 'product',
              model: 'Product',
            },
          },
          {
            path: 'profile',
            populate: {
              path: 'product',
              model: 'Product',
            },
          },
          {
            path: 'addressbool',
            populate: {
              path: 'product',
              model: 'Product',
            },
          },
        ],
      })
      .exec();
  }

  async findUserById(id): Promise<User> {
    return this.userModel
      .findById(id, {}, { lean: true })
      .populate({
        path: 'account',
        populate: [
          {
            path: 'whishlist',
            populate: {
              path: 'product',
              model: 'Product',
            },
          },
          {
            path: 'cart',
            populate: {
              path: 'product',
              model: 'Product',
            },
          },
          {
            path: 'orders',
            populate: {
              path: 'product',
              model: 'Product',
            },
          },
          {
            path: 'profile',
            populate: {
              path: 'product',
              model: 'Product',
            },
          },
          {
            path: 'addressbool',
            populate: {
              path: 'product',
              model: 'Product',
            },
          },
        ],
      })
      .exec();
  }

  async update(id, user): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
  async updateProperty(id, property): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      id,
      { $set: property },
      { upsert: true, new: true },
    );
  }
}
