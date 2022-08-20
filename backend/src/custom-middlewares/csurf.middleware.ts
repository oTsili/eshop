import { Injectable, NestMiddleware } from '@nestjs/common';
import * as csurf from 'csurf';
import { Request } from 'express';

@Injectable()
export class CsurfMiddleware implements NestMiddleware {
  public static configure(opts: CsurfOptions) {
    this.options = opts;
  }

  private static options: CsurfOptions;

  public use(req: any, res: any, next: any) {
    console.log('I am inside csurf middleware');
    console.log({ session: req.session });
    console.log({ cookies: req.cookies });

    console.log({ session_csurf: req.session.csrfSecret });
    // res.cookie('XSRF-TOKEN', req.cookies['XSRF-TOKEN']);
    if (CsurfMiddleware.options) {
      console.log('options with');
      csurf(CsurfMiddleware.options)(req, res, next);
    } else {
      console.log('without options');
      csurf()(req, res, next);
    }
  }
}

export interface CsurfOptions {
  value?: (req: Request) => string;
  cookie?: csurf.CookieOptions | boolean;
  ignoreMethods?: string[];
  sessionKey?: string;
}
