import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CartService } from 'src/cart/cart.service';
import { WhishlistService } from 'src/whishlist/whishlist.service';

@Controller('account')
export class AccountController {
  constructor(
    private readonly whishlistItemService: WhishlistService,
    private readonly cartService: CartService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':user')
  async fetchAccount(@Req() req, @Res() res, @Param() param) {
    const user = param.user;
    const whishlist = await this.whishlistItemService.findWhishlistByUserId(
      user,
    );

    const cart = await this.cartService.findCartItemsByUserId(user);

    //  get orders
    const orders = null;

    // get addressbook
    const addressbook = null;

    const account = {
      whishlist,
      cart,
      orders,
      addressbook,
    };

    return res.status(HttpStatus.OK).json({ account });
  }
}
