import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SharedService } from 'src/shared/shared.service';
import { WhishlistService } from './whishlist.service';

@Controller('whishlist')
export class WhishlistController {
  constructor(
    private readonly whishlistItemService: WhishlistService,
    private readonly sharedService: SharedService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async fetchAll(@Req() req, @Res() res, @Param() userId: string) {
    const whislist = await this.whishlistItemService.findWhishlistByUserId(
      userId,
    );

    return res.status(HttpStatus.OK).json({ whislist });
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createWhishlistItem(@Res() res, @Req() req, @Body() body) {
    // get the whishlistItem to update
    const whishlistItem = body.whishlistItem;
    console.log({ whishlistItem });

    // update the whishlist and get the newlly updated whishlistItem
    const newWhishlistItem = await this.whishlistItemService.create(
      whishlistItem,
    );
    console.log({ newWhishlistItem });

    // get the updated user's account
    const userId = whishlistItem.user;
    const account = await this.sharedService.fetchAccount(userId);

    // send back the account
    return res.status(HttpStatus.CREATED).json({ account });
  }
}
