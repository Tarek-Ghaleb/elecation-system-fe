import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const excludedUrls = ['login'];
    // Check if the request URL matches any of the excluded URLs
    const shouldSkip = excludedUrls.some((url: any) => req.url.includes(url));

    if (shouldSkip) {
      // If the request URL is excluded, pass it through without modification
      return next.handle(req);
    }

    // Otherwise, clone the request and set the Authorization header
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('User')}`,
      },
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
        return throwError(() => error);
      })
    );
  }

  logout() {
    localStorage.removeItem('User');
    localStorage.removeItem('UserName');
  }
}
