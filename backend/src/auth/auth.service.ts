import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

// import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('validateUser');
    console.log({ username }, { pass });
    const user = await this.userService.findUserByEmail(username);
    console.log({ user });
    let comparison;
    if (user) {
      comparison = await bcrypt.compare(pass, user.password);
      console.log({ comparison });
    }
    if (user && comparison) {
      const { password, ...result } = user;
      console.log('paok');
      console.log({ result });
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.email,
      sub: user._id.toString(),
    };
    console.log({ payload });

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
