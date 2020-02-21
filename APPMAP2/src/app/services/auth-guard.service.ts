import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from './../services/authorization.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authorizacionService: AuthorizationService,
    private router: Router) { }

  canActivate(): boolean {
    return this.authorizacionService.isAuthenticated();
  }
}


