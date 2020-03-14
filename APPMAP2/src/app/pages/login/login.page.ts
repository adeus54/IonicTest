import { Component, OnInit, NgModule } from '@angular/core';
import {  AuthorizationService } from '../../services/authorization.service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  input;

  constructor(
    private authorizacionService : AuthorizationService,
    private router: Router,

    ) { 
    
  }
  
  ngOnInit() {
    this.input = {
      username: [''],
      password: ['']    
    };
  }

  
  onLogin(){
    this.authorizacionService.consultarUsuarioIngreso(this.input);
  }
 
}
