import { Params } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../interfaces/user";
import { BehaviorSubject } from "rxjs";
import { Storage } from '@ionic/storage'

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  authenticationState = new BehaviorSubject(false);


  private isUserLoggedIn;
  public usserLogged: User;


  URL_API = 'http://127.0.0.1:8000/login/';

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private plt: Platform) 
  {
    this.plt.ready().then(()=> {
      this.checkToken();
    });
  }

  // consultarDocenteIngreso(usuario: User): Observable<any> {
  //   let params = JSON.stringify(usuario);
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.post(this.URL_API, usuario, { headers});
  // }

  loginUser(userData): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.URL_API, userData);
  }

  iniciarSesionUsuario(token: string, idUsuario: string, nombreUsuario: string, apellidosUsuario: string) {
    this.storage.set('token', token);
    this.storage.set('idDocente', idUsuario);
    this.storage.set('nombreUsuario', nombreUsuario);
    this.storage.set('apellidosDocente', apellidosUsuario);
  }

  obtenerNombreUsuario(){
    return this.storage.get('nombreUsuario');
  }

  login(){  //envia a localstorage
    return this.storage.set(TOKEN_KEY, 'Bearer 123456').then(res => {
      this.authenticationState.next(true);
    });
  }

  logOutUser(){
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated(){
    return this.authenticationState.value;
  }

  checkToken(){
    return this.storage.get(TOKEN_KEY).then(res => {
      if(res) {
        this.authenticationState.next(true);
      }
    });
  }


}
