import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LocalhostInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const secureReq = req.clone({
      // url: req.url.replace('http://', 'https://'),
      url: req.url,
      // .replace(
      //   'http://localhost:3000http://localhost:3000http://localhost:3000',
      //   'http://localhost:3000'
      // )
      // .replace(
      //   'http://localhost:4200http://localhost:3000http://localhost:3000',
      //   'http://localhost:3000'
      // ), // for local development
    });

    return next.handle(secureReq);
  }
}
