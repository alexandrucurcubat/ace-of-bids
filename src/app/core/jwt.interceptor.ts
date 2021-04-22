import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isApiUrl =
      request.url.startsWith('/api') ||
      request.url.startsWith(environment.apiUrl);
    const jwt = this.authService.getJwt();
    if (isApiUrl && jwt) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${jwt}` },
      });
    }

    return next.handle(request);
  }
}
