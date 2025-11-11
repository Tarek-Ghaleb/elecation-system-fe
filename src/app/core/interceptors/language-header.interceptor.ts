import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageHeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const lang = localStorage.getItem('language') || 'ar';

    const modifiedReq = req.clone({
      setHeaders: {
        lang: lang,
      },
    });

    return next.handle(modifiedReq);
  }
}
