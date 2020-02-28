import { Component, OnInit, NgModule } from '@angular/core';
import {  AuthorizationService } from '../../services/authorization.service'
import { Router } from '@angular/router';
import { User } from '../../interfaces/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  input;

  constructor(
    private authorizacionService : AuthorizationService,
    private router: Router
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
    this.router.navigate(['/home'])
  }


  token(){
    this.authorizacionService.obtenerToken()
  }

 
  // onLogin(){
  //   this.authorizacionService.loginUser(this.input).subscribe(
  //     response => {
  //     // console.log(response);
  //     var token = response;
  //     console.log(token);
  //     this.authorizacionService.iniciarSesionUsuario(response.token, response.username, response.id);
  //     // console.log(response);
  //     this.router.navigate(['/home'])
  //     },
  //     error => {
  //       // alert('USER' + ' ' + ' es incorrecto');
  //       console.log('error', error);
  //     },
  //   );
  // }

  // navigate(){
  //   this.router.navigate(['/home'])
  // }

}
