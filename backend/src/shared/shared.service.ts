import { Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { WhishlistService } from 'src/whishlist/whishlist.service';

@Injectable()
export class SharedService {
  constructor(
    private readonly whishlistItemService: WhishlistService,
    private readonly cartService: CartService,
  ) {}
  async fetchAccount(userId: string) {
    const whislist = await this.whishlistItemService.findWhishlistByUserId(
      userId,
    );

    const cart = await this.cartService.findCartItemsByUserId(userId);

    //  get orders
    const orders = null;

    // get addressbook
    const addressbook = null;

    const account = {
      whislist,
      cart,
      orders,
      addressbook,
    };

    return account;
  }
}
