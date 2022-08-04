import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
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
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  // @UseGuards(AuthGuard('local'))
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(LocalAuthGuard)
  @FormDataRequest()
  @Post('/login')
  async login(
    @Request() req,
    @Res() res,
    @Body() user: { username: string; password: string },
    @Session() session: Record<string, any>,
  ) {
    // console.log(session.id);
    let dbUser = req.user._doc;
    delete dbUser.password;
    console.log(dbUser);
    const { access_token } = await this.authService.login(dbUser);
    // console.log({ userDB });
    const expiresIn = this.jwtService.decode(access_token)['exp'];
    console.log({ expiresIn });

    // // store jwt in the express-session
    session.jwt = access_token;
    console.log({ session });

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
    // console.log(req.csrfToken());

    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    const newUser = await this.userService.create(user);

    console.log({ newUser });

    // const { access_token } = await this.authService.login({user.email, user.password});

    // console.log({ access_token });

    // // store jwt in the express-session
    // session.jwt = access_token;

    // return res.status(HttpStatus.CREATED).json({ access_token });
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
    console.log(session);
    let isAuth = true;
    if (!session.jwt) {
      isAuth = false;
    }
    return await res.status(HttpStatus.OK).json(isAuth);
  }
  // empty get request controller must be the last in the order (in cardinal order)
  @Get(':email')
  async fetchUser(@Res() response, @Param('email') email: string) {
    let users = await this.userService.findUserByEmail(email);
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
