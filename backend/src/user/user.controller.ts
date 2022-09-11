import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Request,
  // Response,
  Res,
  Session,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Response, Request as Reqst } from 'express';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
// import { ValidationPipe } from 'src/pipes/validation.pipe';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';
import { JwtService } from '@nestjs/jwt';
import { CartService } from 'src/cart/cart.service';
import { WhishlistService } from 'src/whishlist/whishlist.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
    private readonly cartService: CartService,
    private readonly whishlistService: WhishlistService,
  ) {}

  // @UseGuards(AuthGuard('local'))
  // @UseFilters(new HttpExceptionFilter())
  @UseGuards(LocalAuthGuard)
  @FormDataRequest()
  @Post('/login')
  async login(
    @Request() req,
    @Res() res,
    @Body() body,
    @Session() session: Record<string, any>,
  ) {
    // console.log({ body });
    // console.log({ user: dbUser });
    let dbUser = req.user;

    const whishlist = await this.whishlistService.findWhishlistByUserId(
      dbUser._id,
    );

    const cart = await this.cartService.findCartItemsByUserId(dbUser._id);

    dbUser.account = { whishlist, cart };
    // login with jwt and get the jwt token
    const { access_token } = await this.authService.login(dbUser);

    // inspect the expiresIn property
    // const expiresIn = this.jwtService.decode(access_token)['exp'];
    // console.log({ expiresIn });

    // store jwt in the express-session
    session.jwt = access_token;
    // console.log({ session });

    return res.status(HttpStatus.OK).json(dbUser);
  }

  @Get('/logout')
  async signout(@Res() res: Response, @Session() session: Record<string, any>) {
    session.jwt = null;
    return res.status(HttpStatus.OK).json();
  }

  // @UsePipes(new ValidationPipe())

  @Post('/signup')
  @FormDataRequest()
  async createUser(
    @Res() res: Response,
    @Req() req,
    @Body() user: User,
    @Session() session: Record<string, any>,
  ) {
    // generate a salt for the password hash
    const salt = await bcrypt.genSalt();

    // get the password hash
    const hash = await bcrypt.hash(user.password, salt);
    // save the password hash to the user password property
    user.password = hash;

    // save the new user to the db and get the user mongoose document
    let newUser = await this.userService.create(user);

    // get rid of the extra added properties by mongoose
    newUser = newUser._doc;
    // delete  the password from the object we will send to the client
    delete newUser.password;

    const { access_token } = await this.authService.login(newUser);

    // store jwt in the express-session
    session.jwt = access_token;

    return res.status(HttpStatus.CREATED).json({ newUser });
  }

  // @Get('')
  // async fetchAll(@Res() response) {
  //   let users = await this.userService.findAll();

  //   const totalUsers = users.length;

  //   const message = 'users fetched';

  //   return response.status(HttpStatus.OK).json({ message, users, totalUsers });
  // }

  @UseGuards(JwtAuthGuard)
  @Get('isAuth')
  async validateAuth(
    @Req() req,
    @Res() res,
    @Session() session: Record<string, any>,
  ) {
    // console.log(session);
    let isAuth = true;
    if (!session.jwt) {
      isAuth = false;
    }

    // console.log({ user: req.user });

    return await res.status(HttpStatus.OK).json(req.user);
  }

  // empty get request controller must be the last in the order (in cardinal order)
  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async fetchUser(@Res() response, @Param('email') email: string) {
    let user = await this.userService.findUserByEmail(email);

    // console.log({ userFromEmail: user });
    return await response.status(HttpStatus.OK).json({ user });
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() body: any) {
    console.log({ body });
    console.log({ id });
    const updatedUser = await this.userService.update(id, body);
    console.log({ updatedUser });
    return response.status(HttpStatus.OK).json({ updatedUser });
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('test')
  // async fetchTest(
  //   @Res() response,
  //   @Req() req,
  //   @Param('email') email: string,
  //   @Session() session: Record<string, any>,
  // ) {
  //   let users = await this.userService.findUserByEmail('test@test.com');
  //   console.log(users);
  //   return response.status(HttpStatus.OK).json({ users });
  // }

  // @Get('test')
  // async validateAuth(@Res() response, @Session() session: Record<string, any>) {
  //   // console.log(req.user);
  //   // return response.status(HttpStatus.OK).json({ user: req.user });

  //   return response.status(HttpStatus.OK).json({ user: 'paok' });
  // }
}
