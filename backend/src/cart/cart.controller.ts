import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { CartService } from './cart.service';
import { CartItem } from './schemas/cart.schema';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async fetchUserCart(@Req() req, @Res() res, @Param('userId') userId: string) {
    const cartItems = await this.cartService.findCartItemsByUserId(userId);

    return res.status(HttpStatus.OK).json(cartItems);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createCartItem(@Res() res, @Req() req: Request, @Body() body) {
    // console.log({ cat: body.cartItem });

    const cartItem = body.cartItem;
    // const userId = cartItem.user;

    const newCartItem = await this.cartService.create(cartItem);
    // console.log({ newCartItem });
    // let user = await this.userService.findUserById(userId);

    // let updatedUser;
    // if (user) {
    //   user.account.cart.push(cartItem);
    //   updatedUser = await this.userService.update(userId, user);
    //   console.log({ updatedUser });
    // }

    // return res.status(HttpStatus.CREATED).json(updatedUser);
    return res.status(HttpStatus.CREATED).json(newCartItem);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedCartItem = await this.cartService.delete(id);

    return response.status(HttpStatus.OK).json({ deletedCartItem });
  }
}
