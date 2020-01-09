import { Component, OnInit } from '@angular/core';

import {  AuthorizationService } from '../../services/authorization.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private servicio : AuthorizationService ) { 
    
  }
  
  ngOnInit() {
    this.obtMensaje();
  }
  obtMensaje(){
    this.servicio.getMensaje();
  }
  
}
