import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from 'src/auth/strategies/jwt-auth.strategy';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CsurfMiddleware } from 'src/middlewares/csurf.middleware';

@Module({
  imports: [
    NestjsFormDataModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {
  // configure(consumer: MiddlewareConsumer) {
  // in case we wanted to provide some options to middleware (e.g. send csrf token via cookies)
  // CsurfMiddleware.configure({ cookie: false });
  // CsurfMiddleware.configure({ sessionKey: 'csurf' });
  // consumer.apply(CsurfMiddleware).forRoutes('user/login');
  // .forRoutes({ path: 'user/signup', method: RequestMethod.POST });
  // }
}
