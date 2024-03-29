import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({
      //url: `http://localhost:3000${request.url}`,
      url: `${environment.apiUrl}${request.url}`,
    });
    return next.handle(apiReq);
  }
}
