import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  UrlSegment,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { User } from 'src/app/shared/models/user';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.loggedUser$.pipe(
      map((loggedUser: User | null) => !!loggedUser),
      tap((isLogged: boolean) => !isLogged && this.router.navigate(['']))
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.loggedUser$.pipe(
      map((loggedUser: User | null) => !!loggedUser),
      tap((isLogged: boolean) => !isLogged && this.router.navigate(['']))
    );
  }
}
