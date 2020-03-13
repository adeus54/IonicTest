import { Component, OnInit, NgModule } from '@angular/core';
import {  AuthorizationService } from '../../services/authorization.service'
import { Router } from '@angular/router';
import { User } from '../../interfaces/user'
import { ToastController } from '@ionic/angular';

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
    public toastController: ToastController
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
    this.presentToast();
  //  this.router.navigate(['/home'])
  }


  token(){
    this.authorizacionService.obtenerToken()
  }

 
  async presentToast() {
    const toast = await this.toastController.create({
      color: 'success',
      message: 'Usuario Logueado',
      duration: 1000
    });
    toast.present();
  }
}
