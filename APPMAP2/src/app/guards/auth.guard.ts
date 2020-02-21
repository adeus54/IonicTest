
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  input;

  constructor(
    private authorizacionService: AuthorizationService,
    private router: Router
  ){}

  ngOnInit() {
    this.input = {
      username: '',
      password: ''    
    };
  }

  canActivate(): boolean {
    return this.authorizacionService.isAuthenticated();
  }
  
  
}
