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
    const user = await this.userService.findUserByEmail(username);
    let comparison: boolean;

    if (user) {
      comparison = await bcrypt.compare(pass, user.password);
    }
    if (user && comparison) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user._id.toString(),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
